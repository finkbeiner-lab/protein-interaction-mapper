export function proteinAnnotationSerializer(dataList, delimiterCharacter) {
	let serializedDataList = [];
	for (const uniqueRow of dataList) {
		let valueNameList = Object.keys(uniqueRow);
		let multipleValuePositionMap = {};
		let valuePositionMap = {};
		let delimitedRowValues = Object.values(uniqueRow).map((value) => {
			if (value && value.includes(delimiterCharacter)) {
				return value.split(delimiterCharacter);
			} else {
				return value;
			}
		});

		for (const [i, value] of delimitedRowValues.entries()) {
			// if row has any split fields
			if (Array.isArray(value)) {
				for (const [j, entry] of value.entries()) {
					multipleValuePositionMap[entry] = j;
					valuePositionMap[entry] = i;
				}
			} else {
				valuePositionMap[value] = i;
			}
		}

		let currentDataIndex = serializedDataList.length - 1;
		// if multiple values in field
		if (Object.keys(multipleValuePositionMap).length > 0) {
			const maxValueLength = Math.max(...Object.values(multipleValuePositionMap));
			for (let i = 0; i <= maxValueLength; i++) {
				serializedDataList.push({});

				const valuesInRange = Object.keys(multipleValuePositionMap).filter(
					(value) => multipleValuePositionMap[value] === i
				);
				const valuesInRangeIndices = valuesInRange.map((value) => valuePositionMap[value]);
				const constantValues = Object.keys(valuePositionMap).filter(
					(field) => !valuesInRangeIndices.includes(valuePositionMap[field])
				);
				const rowValues = [...constantValues, ...valuesInRange];
				for (const value of rowValues) {
					serializedDataList[currentDataIndex][valueNameList[valuePositionMap[value]]] = value;
				}
				currentDataIndex = serializedDataList.length - 1;
			}
		} else {
			serializedDataList.push({});
			serializedDataList[currentDataIndex] = uniqueRow;
		}
	}
	console.log(serializedDataList);

	return serializedDataList;
}
