export default function download(fileName, blob) {
    let url = URL.createObjectURL(blob);

    let anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = fileName;
    anchor.style = "display: none";
    document.body.append(anchor);
    anchor.click();
    anchor.remove();

    URL.revokeObjectURL(url);
}