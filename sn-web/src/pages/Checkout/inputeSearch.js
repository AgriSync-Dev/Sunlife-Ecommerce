import { useRef, useEffect, useState } from "react";
import FormControl from 'react-bootstrap/FormControl';
import Form from 'react-bootstrap/Form';
import { BiErrorCircle } from "react-icons/bi";




const AddressInput = (props) => {

  const [inputError, setInputError] = useState(false);
  const autoCompleteRef = useRef();
  const inputRef = useRef(null);
  const options = {
    fields: [
      "address_components",
      "geometry",
      "formatted_address",
      "icon",
      "name",
    ],
  };


  useEffect(() => {
    const getaddressdata = (data) => {
      props.getdatafromaddress(data)
    }
    const addresslinetwos=(data)=>{
      props.addresslinetwos(data)
    }
   

    try {
      
      autoCompleteRef.current = new window.google.maps.places.Autocomplete(
        inputRef.current,
        options
      );
      // autoCompleteRef.current.setComponentRestrictions({ country: 'US' });

      autoCompleteRef.current.addListener("place_changed", (e) => {
        const place = autoCompleteRef.current.getPlace();
        getaddressdata(place)

        //postal Code
        let postalCode =
          place?.address_components?.find((c) => c.types.includes("postal_code")) ||
          {};
        if (postalCode && Object.keys(postalCode).length > 0) {
          props.pinCode(postalCode.long_name)
        }
        //country
        let country = place?.address_components?.find((c) =>
          c.types.includes("country")
        );
        if (country && Object.keys(country).length > 0) {
        }
        //state
        let state = place?.address_components?.find((c) =>
          c.types.includes("administrative_area_level_1")
        );
        if (state && Object.keys(state).length > 0) {
          props.statename(state.long_name)
        }
        //city
        let city = place?.address_components?.find(
          (c) =>
            c.types.includes("locality") ||
            c.types.includes("postal_town") ||
            c.types.includes("administrative_area_level_2")
        );
        if (city && Object.keys(city).length > 0) {
          props.cityname(city.long_name)
        }

        //neighborhood
        let neighborhood = place?.address_components?.find(
          (c) =>
            c.types.includes("neighborhood")
        );
        // if (neighborhood && Object?.keys(city)?.length > 0) {
        // }

        //point intrest
        let pointintrest = place?.address_components?.find((c) =>
          c.types.includes("point_of_interest")
        );
        if (pointintrest && Object.keys(pointintrest).length > 0) {
        }
        //permise
        let permise = place?.address_components?.find((c) =>
          c.types.includes("premise")
        );
        if (permise && Object.keys(permise).length > 0) {
        }

        //street
        let street = place?.address_components?.find((c) =>
          c.types.includes("street_number")
        );
        if (street && Object.keys(street).length > 0) {
        }
        //route
        let route = place?.address_components?.find((c) =>
          c.types.includes("route")
        );
        if (route && Object.keys(route).length > 0) {
        }
        //sublocatlity 3
        let sublocal3 = place?.address_components?.find((c) =>
          c.types.includes("sublocality_level_3")
        );
        if (sublocal3 && Object.keys(sublocal3).length > 0) {
        }
        //sublocatlity 2
        let sublocal2 = place?.address_components?.find((c) =>
          c.types.includes("sublocality_level_2")
        );
        if (sublocal2 && Object.keys(sublocal2).length > 0) {
        }

        //sublocatlity 1
        let sublocal1 = place?.address_components?.find((c) =>
          c.types.includes("sublocality_level_1")
        );
        if (sublocal1 && Object.keys(sublocal1).length > 0) {
        }
      

        let a8 =
          typeof neighborhood != "undefined" &&
            neighborhood &&
            Object.keys(neighborhood).length > 0
            ? neighborhood.long_name
            : "";

        let a1 =
          typeof street != "undefined" && street && Object.keys(street).length > 0
            ? street.long_name
            : "";
        let a2 =
          typeof route != "undefined" && route && Object.keys(route).length > 0
            ? route.long_name
            : "";
        let a3 =
          typeof sublocal3 != "undefined" &&
            sublocal3 &&
            Object.keys(sublocal3).length > 0
            ? sublocal3.long_name
            : "";
        let a4 =
          typeof sublocal2 != "undefined" &&
            sublocal2 &&
            Object.keys(sublocal2).length > 0
            ? sublocal2.long_name
            : "";
        let a5 =
          typeof sublocal1 != "undefined" &&
            sublocal1 &&
            Object.keys(sublocal1).length > 0
            ? sublocal1.long_name
            : "";
        let a6 =
          typeof pointintrest != "undefined" &&
            pointintrest &&
            Object.keys(pointintrest).length > 0
            ? pointintrest.long_name
            : "";
        let a7 =
          typeof permise != "undefined" &&
            permise &&
            Object.keys(permise).length > 0
            ? permise.long_name
            : "";
        let arr = [];

        if (a8.length > 0) {
          arr.push(a8);
        }
        if (a6.length > 0) {
          arr.push(a6);
        }
        if (a7.length > 0) {
          arr.push(a7);
        }
        if (a1.length > 0) {
          arr.push(a1);
        }
        if (a2.length > 0) {
          arr.push(a2);
        }
        if (a3.length > 0) {
          arr.push(a3);
        }
        if (a4.length > 0) {
          arr.push(a4);
        }
        if (a5.length > 0) {
          arr.push(a5);
        }
        addresslinetwos(arr.toString())

        let obj = {
          postCode:
            typeof postalCode != "undefined" &&
              postalCode &&
              Object.keys(postalCode).length > 0
              ? postalCode.long_name
              : "",
          iso:
            typeof country != "undefined" && Object.keys(country).length > 0
              ? country.short_name
              : "",
          country:
            typeof country != "undefined" && Object.keys(country).length > 0
              ? country.long_name
              : "",
          city:
            typeof city != "undefined" && city && Object.keys(city).length > 0
              ? city.long_name
              : "",
          state:
            typeof state != "undefined" && state && Object.keys(state).length > 0
              ? state.long_name
              : "",
          address1: typeof state != "undefined" && state && Object.keys(state).length > 0
          ? arr.toString()
          : "",
          formatted_address: 
           typeof state != "undefined" && state && Object.keys(place.formatted_address).length > 0
          ? place.formatted_address 
          : "",
          
        };
       console.log(obj);
if(obj){
  props.getCompleteObj(obj)
}
        

        // Do something with the resolved place here (ie store in redux state)
      });
    } catch (e) {
      console.log("error:--", e);
    }

  }, []);

  useEffect(() => {
    if (inputRef) {
      inputRef.current.value = props.value;

    }
  }, [props.value]);
  
  const handleInputClick = () => {
    props.clearErrors();
  };


  return (
    <div className="relative mt-[2px]">
      <div className="">
        <label
          id={`lbl${props.id}`}
          for={props.id}
          className="mt-3 mb-1"
        >
          {props.label} {!props.optional ? <span className="">*</span> : null}
        </label>
        {props.optional ? <p className="">Optional</p> : null}
      </div>
      <Form.Group>
        <FormControl
          ref={inputRef}
          disabled={props.disabled}
          name={props.id}
          id={props.id}
          style={{ height: '3rem', borderColor: props.error ? 'red' : 'black' }}
          className={`w-100`}
          onChange={props.onChange}
          onClick={handleInputClick} 

          placeholder={`${props.placeholder === 'Commitment' ? 'Amount' : props.placeholder}`}
        />
      </Form.Group>
      {props.error && (
        <div style={{ color: 'red', paddingTop: '5px', display: 'flex', alignItems: 'center' }}>
          <span className="d-flex" style={{ justifyContent: 'center', alignItems: 'center' }}>
            <BiErrorCircle />
          </span>
          <span style={{ fontSize: '14px', paddingLeft: '5px' }}>{props.error}</span>
        </div>
      )}
    </div>
  );
};
export default AddressInput;