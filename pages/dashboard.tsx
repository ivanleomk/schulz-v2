import type { NextPage } from "next";
import { useState } from "react";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { ClipLoader } from "react-spinners";
import { useS3Upload } from "next-s3-upload";
import { signOut } from "next-auth/react";
import DashboardTabComponent from "@/components/DashboardTabComponent";

const tabs = [
  {
    label: "Meeting Notes",
    value: "Meeting Notes",
  },
  {
    label: "Audio Transcript",
    value: "Audio Transcript",
  },
];

const Dashboard: NextPage = () => {
  return (
    <>
      <div className="container flex flex-col items-start justify-between space-y-2 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-16 border-b-2">
        <h2 className="text-lg font-semibold">Schulz.AI</h2>
        <div className="ml-auto flex w-full space-x-2 sm:justify-end">
          User Avatar
        </div>
      </div>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        </div>
        <DashboardTabComponent values={tabs} />
      </div>
    </>
  );
};

export default Dashboard;

// const [file, setFile] = useState<File | null>(null);
// const [uploadingFile, setUploadingFile] = useState(false);
// let { FileInput, openFileDialog, uploadToS3 } = useS3Upload();

// const handleUpload = async () => {
//   if (file === null) {
//     alert("No File");
//   }
//   setUploadingFile(true);
//   let { url, key } = await uploadToS3(file as File);
//   console.log(url, key);

//   const updateDb = await fetch("api/create-new-file", {
//     method: "POST",
//     body: JSON.stringify({
//       url,
//       key,
//     }),
//   });

//   setUploadingFile(false);
// };

// return (
//   <div className="grid w-full max-w-sm items-center gap-1.5 mb-6">
//     <Button onClick={() => signOut()}>Click to sign out</Button>
//     <Label htmlFor="Audio Transcript">Audio Transcript</Label>
//     <Input
//       id="Audio Transcript"
//       type="file"
//       accept=".mp3,.mp4"
//       onChange={(e) => {
//         const files = e?.target?.files;
//         if (files && files.length > 0) {
//           setFile(files[0]);
//         }
//       }}
//     />
//     <p className="text-xs text-gray-400">
//       Upload an audio transcript and we&apos;ll transcribe it all
//     </p>
//     <Button
//       className="py-1 px-2 w-full"
//       onClick={() => {
//         handleUpload();
//       }}
//       variant="outline"
//       disabled={uploadingFile}
//     >
//       {uploadingFile ? (
//         <ClipLoader size={20} speedMultiplier={0.4} />
//       ) : (
//         "Upload Audio"
//       )}
//     </Button>
//   </div>
