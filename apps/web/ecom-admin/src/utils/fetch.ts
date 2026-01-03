import axiosInstance from "@/lib/axios";
export const getFileFields = async (url: string[] | string) => {
    const fetchImageAsFile = async (url: string): Promise<File> => {
        const response = await axiosInstance.get(`/cdn/?url=${url}`, {
            responseType: "blob",
        }); // Set responseType to 'blob'
        const blob = response.data;
        const fileName = url.split("/").pop() || "default_filename"; // Extract file name from URL
        return new File([blob], fileName, { type: blob.type });
    };

    const createFileList = (files: File[]): FileList => {
        const dataTransfer = new DataTransfer();
        files.forEach((file) => dataTransfer.items.add(file));
        return dataTransfer.files;
    };

    if (typeof url === "string") {
        return Array.from(createFileList([await fetchImageAsFile(url)]));
    } else {
        return Array.from(
            createFileList(
                await Promise.all(url.map(async (url) => await fetchImageAsFile(url))),
            ),
        );
    }
};