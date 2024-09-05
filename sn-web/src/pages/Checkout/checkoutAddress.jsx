import React, { useRef, useEffect, useState } from "react";
import { BiErrorCircle } from "react-icons/bi";

const CheckoutAddress = ({
	deliveryDetails,
	setDeliveryDetails,
	formErrors,
	setFormErrors }) => {
	const autoCompleteRef = useRef(null);
	const inputRef = useRef(null);

	useEffect(() => {
		const initAutocomplete = () => {
			if (!window.google) {
				console.error("Google Maps JavaScript API not loaded");
				return;
			}

			const options = {
				fields: ["address_components", "geometry", "formatted_address", "icon", "name"],
				// types: ["address"],
			};

			autoCompleteRef.current = new window.google.maps.places.Autocomplete(inputRef.current, options);

			autoCompleteRef.current.addListener("place_changed", () => {
				const place = autoCompleteRef.current.getPlace();
				// console.log("places--",place)
				// Process the address components here
				const addressObj = processAddress(place?.address_components || null, place?.geometry || null, place?.name || "", place?.formatted_address || "");
			});
		};

		initAutocomplete();
	}, []);

	const processAddress = (addressComponents, geometry, name, formatted_address) => {
		const getAddressComponent = (type) => {
			return addressComponents?.find(component => component.types.includes(type)) || {};
		};

		// Defined types to exclude from the detailed address line
		const excludeTypes = ["administrative_area_level_1", "country", "postal_code"];

		// Constructing the detailed address line
		const streetAddress = addressComponents?.filter(
			component => !excludeTypes.some(type => component?.types.includes(type)))
			.map(component => component?.long_name)
			.join(', ');
		const city = getAddressComponent("locality")?.long_name || getAddressComponent("postal_town")?.long_name || "";
		const state = getAddressComponent("administrative_area_level_1")?.long_name || "";
		const countryComponent = getAddressComponent("country");
		const country = countryComponent?.long_name || "";
		const iso = countryComponent?.short_name || "";
		const postalCode = getAddressComponent("postal_code")?.long_name || "";

		const addressObj = {
			state,
			city,
			zip: postalCode,
			country,
			iso,
			address: `${streetAddress}`
		};
		setDeliveryDetails(prevDetails => ({
			...prevDetails,
			...addressObj
		}));


		// Optionally include latitude and longitude if geometry is available
		// if (geometry && geometry.location) {
		//     address.latitude = geometry.location.lat();
		//     address.longitude = geometry.location.lng();
		// }

		return addressObj;
	};

	return (
		<div className="address-autocomplete-input">
			<label className='mb-1'>Address <span className='text-danger'>*</span>
				<span className="mx-2   " style={{fontSize:14,color:"gray"}}>Please make sure all address information including Unit and PO numbers are in the address lines and not order notes</span>
			</label>
			<input
				ref={inputRef} // Ensure autocomplete functionality is attached to this input
				value={deliveryDetails?.address || ""}
				onChange={(e) => {
					let address = e.target.value;
					if (!address) {
						setFormErrors({
							...formErrors,
							address: "Address is a required field."
						});
					} else {
						const { ["address"]: _, ...newState } = formErrors;
						setFormErrors(newState);
					}
					setDeliveryDetails({
						...deliveryDetails,
						address: address
					});
				}}
				name="address"
				className={`form-control ${formErrors?.address ? 'border-danger' : 'border-dark'}`}
				type="text"
				placeholder="Address"
			/>
			{/* {formErrors?.address && (
				<div className="text-danger mt-2">
					{formErrors.address}
				</div>
			)} */}
		</div>
	);
};

export default CheckoutAddress;