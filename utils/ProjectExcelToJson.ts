function allNull(row: Array<any>) {
	return row.every((ele) => ele == null);
}
export default function convertXLSXToJson(
	rows: Array<Array<string | null>>
): Array<Record<string, any>> {
	let res = [];
	let temp: {
		name: string | null;
		members: Array<string | null>;
	} = { name: null, members: [] };
	rows.slice(1).map((row) => {
		if (allNull(row)) {
			return;
		}
		if (row[0] != null) {
			res.push(JSON.parse(JSON.stringify(temp)));
			temp.name = row[1];
			temp.members = [row[2]];
		} else {
			temp.members.push(row[2]);
		}
	});
	res.push(JSON.parse(JSON.stringify(temp)));
	const filteredData = res
		.map((item) => ({
			...item,
			members: item.members.filter((member: any) => member !== null),
		}))
		.filter((item) => {
			if (
				item.name == null &&
				(item.members == null || item.members.length == 0)
			)
				return false;
			return true;
		});

	return filteredData;
}
