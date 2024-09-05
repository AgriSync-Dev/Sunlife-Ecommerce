export function ellipseAddress(address = "", width = 4) {
	if (!address) {
		return "";
	}
	return `${address.slice(0, width)}...${address.slice(-width)}`;
}