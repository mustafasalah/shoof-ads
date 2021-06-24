import { useEffect, useRef } from "react";

const permissions = new Map([
	["admin", 3],
	["supervisor", 2],
	["publisher", 1],
	["user", 0],
]);

export function usePrevious(value) {
	const ref = useRef([]);
	useEffect(() => {
		ref.current = value;
	});
	return ref.current;
}

export const authorize = (currentRole, requiredRole) => {
	return permissions.get(currentRole) >= permissions.get(requiredRole);
};

export function toFileSize(bytes) {
	return (bytes / 1000).toFixed(2) + "KB";
}

export function deepCopy(inObject) {
	let outObject, value, key;

	if (
		inObject === null ||
		typeof inObject !== "object" ||
		inObject instanceof File
	) {
		return inObject; // Return the value if inObject is not an object
	}

	// Create an array or object to hold the values
	outObject = Array.isArray(inObject) ? [] : {};

	for (key in inObject) {
		value = inObject[key];

		// Recursively (deep) copy for nested objects, including arrays
		outObject[key] = deepCopy(value);
	}

	return outObject;
}

export function upperFirst(str) {
	return str.slice(0, 1).toUpperCase() + str.slice(1).toLowerCase();
}

export function range(first, last) {
	const array = [],
		length = last - first + 1;
	for (let i = 0; i < length; i++) {
		array[i] = first++;
	}
	return array;
}

export function getNestedProperty(object, property) {
	property = property.split(".");
	return property.reduce((obj, prop) => {
		return obj[prop] === undefined ? "" : obj[prop];
	}, object);
}

export function setNestedProperty(object, property, value) {
	property = property.split(".");
	property.reduce((obj, prop, i) => {
		if (i + 1 === property.length) obj[prop] = value;
		return obj[prop];
	}, object);
}
