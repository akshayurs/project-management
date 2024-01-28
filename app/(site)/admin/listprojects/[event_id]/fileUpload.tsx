"use client";
import { Upload, Button } from "antd";
import { DownloadOutlined, UploadOutlined } from "@ant-design/icons";
import readXlsxFile from "read-excel-file";
import convertXLSXToJson from "@/utils/ProjectExcelToJson";
import { sendReq } from "@/utils/sendReq";
import { useRouter } from "next/navigation";
import { Profile } from "@/types/types";
import Link from "next/link";

const FileUpload = ({
	profile,
	event_id,
}: {
	profile: Profile | null;
	event_id: Number;
}) => {
	const router = useRouter();
	const beforeUpload = (file: any) => {
		if (file) {
			readXlsxFile(file).then(async (data) => {
				const arr = convertXLSXToJson(
					data as Array<Array<string | null>>
				).map((item) => ({
					...item,
					created_by_id: profile?.id,
					event_id,
				}));
				await sendReq({
					url: "/api/project/admin",
					method: "POST",
					body: arr,
					loading: "Uploading",
					success: "Uploaded",
				});
				router.refresh();
			});
		}
		return false;
	};

	return (
		<div className="mb-3 space-x-2">
			<div className="mb-2 font-bold text-xl">
				Upload Project with .xlsx File
			</div>
			<Upload
				beforeUpload={beforeUpload}
				maxCount={1}
				multiple={false}
				showUploadList={false}
			>
				<Button icon={<UploadOutlined />}>Upload File</Button>
			</Upload>
			<Link href={"/download/Teams templates.xlsx"}>
				<Button icon={<DownloadOutlined />}>Download Template</Button>
			</Link>
		</div>
	);
};

export default FileUpload;
