import { message } from "antd";
import { useState } from "react";

const sendReq = async ({
	url,
	method,
	body,
	loading,
	success,
	error,
	showError,
}: {
	url: string;
	method: "GET" | "POST" | "PUT" | "DELETE";
	body?: Record<string, any>;
	loading?: string;
	success?: string;
	error?: string;
	showError?: boolean;
}) => {
	let res;
	if (loading) {
		message.loading(loading);
	}
	if (method === "GET") {
		res = await fetch(url);
	} else {
		res = await fetch(url, {
			method,
			headers: {
				"Content-Type": "",
			},
			body: JSON.stringify(body),
		});
	}
	const json = await res.json();
	message.destroy();
	if (json.success == true && success) {
		message.success(success);
	} else if (showError == true) {
		message.error(error ?? json.message);
	}
	return json;
};

const useSendReq = async ({
	url,
	method,
	body,
}: {
	url: string;
	method: "GET" | "POST" | "PUT" | "DELETE";
	body: Record<string, any>;
}) => {
	const [loading, setLoading] = useState(true);
	let res, data;
	if (method === "GET") {
		res = await fetch(url);
	} else {
		res = await fetch(url, {
			method,
			headers: {
				"Content-Type": "",
			},
			body: JSON.stringify(body),
		});
	}
	data = await res.json();

	setLoading(false);
	return { loading, data };
};

export { sendReq, useSendReq };
