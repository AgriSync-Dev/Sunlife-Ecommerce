import React, { useCallback, useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";

const MultiRangeSlider = ({ min, max, onChange, clearFilter }) => {
	const [minVal, setMinVal] = useState(min);
	const [maxVal, setMaxVal] = useState(max);
	const minValRef = useRef(min);
	const maxValRef = useRef(max);
	const range = useRef(null);

	const getPercent = useCallback((value) => Math.round(((value - min) / (max - min)) * 100), [min, max]);

	useEffect(() => {
		// Reset values if clearFilter is true
		if (clearFilter) {
			setMinVal(min);
			setMaxVal(max);
			minValRef.current = min;
			maxValRef.current = max;
		}

		const minPercent = getPercent(minVal);
		const maxPercent = getPercent(maxValRef.current);

		if (range.current) {
			range.current.style.left = `${minPercent}%`;
			range.current.style.width = `${maxPercent - minPercent}%`;
		}
	}, [minVal, getPercent, clearFilter]);

	useEffect(() => {
		const minPercent = getPercent(minValRef.current);
		const maxPercent = getPercent(maxVal);

		if (range.current) {
			range.current.style.width = `${maxPercent - minPercent}%`;
		}
	}, [maxVal, getPercent]);

	useEffect(() => {
		onChange({ min: minVal, max: maxVal });
	}, [minVal, maxVal, onChange]);

	return (
		<div className="d-flex justify-content-center" style={{ minWidth: "100%" }}>
			<div className="slider">
				<input
					type="range"
					min={min}
					max={max}
					value={minVal}
					onChange={(event) => {
						const value = Math.min(Number(event.target.value), maxVal - 1);
						setMinVal(value);
						minValRef.current = value;
					}}
					className="thumb thumb--left"
					style={{ zIndex: minVal > max - 100 && "5", minWidth: "" }}
				/>
				<input
					type="range"
					min={min}
					max={max}
					value={maxVal}
					onChange={(event) => {
						const value = Math.max(Number(event.target.value), minVal + 1);
						setMaxVal(value);
						maxValRef.current = value;
					}}
					className="thumb thumb--right"
				/>
				<div className="slider__track" />
				<div ref={range} className="slider__range" />
				<div className="slider__left-value">{minVal}</div>
				<div className="slider__right-value">{maxVal}</div>
			</div>
		</div>
	);
};

MultiRangeSlider.propTypes = {
	min: PropTypes.number.isRequired,
	max: PropTypes.number.isRequired,
	onChange: PropTypes.func.isRequired,
	clearFilter: PropTypes.bool,
};

export default MultiRangeSlider;
