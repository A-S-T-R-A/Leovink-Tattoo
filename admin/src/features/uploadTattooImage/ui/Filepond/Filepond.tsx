import { FilePond, registerPlugin } from "react-filepond"
import { FilePondFile } from "filepond"
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size"
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type"
import FilePondPluginImagePreview from "filepond-plugin-image-preview"
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css"
import "filepond/dist/filepond.min.css"

interface IFilepond {
    files: FilePondFile[]
    setFiles: (files: FilePondFile[]) => void
}

export function Filepond({ files, setFiles }: IFilepond) {
    registerPlugin(
        FilePondPluginFileValidateSize,
        FilePondPluginFileValidateType,
        FilePondPluginImagePreview
    )

    return (
        <FilePond
            files={files.map(item => item.file)}
            allowReorder={false}
            allowMultiple={true}
            onupdatefiles={setFiles}
            labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
            maxFileSize="500KB"
            acceptedFileTypes={["image/png", "image/jpeg", "image/webp"]}
        />
    )
}
