import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { fileType } from "@/src/types/file";
import { useState } from "react";
import {
  ArrowBigDown,
  ArrowDown,
  ArrowDownWideNarrow,
  ChevronDown,
  ChevronUp,
  FileDown,
  LucideArrowBigDown,
  PlusCircle,
  PlusCircleIcon,
  PlusSquare,
} from "lucide-react";
import { useMutation, useQueryClient } from "react-query";
import { DELETE_USER_FILE, GET_USER_FILES } from "@/src/types/queries";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { ClipLoader } from "react-spinners";
type Props = {
  item: fileType[number];
};
const FileUploadCard = ({ item }: Props) => {
  const [showFullText, setShowFullText] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const queryClient = useQueryClient();

  const toggleText = () => {
    setShowFullText(!showFullText);
  };

  const handleDelete = () => {
    return fetch("/api/delete-file", {
      method: "POST",
      body: JSON.stringify({
        fileId: item.id,
      }),
    }).then((res) => {
      setDeleteModal(false);
      queryClient.invalidateQueries({
        queryKey: GET_USER_FILES,
      });
    });
  };

  const mutation = useMutation(DELETE_USER_FILE, handleDelete);

  return (
    <Card key={item.id} className="mt-4">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="">
          <p className="text-md font-semibold mb-2">
            {item.key.split("/").pop()?.trim()}
          </p>
          {item.isProcessing ? (
            <Badge variant="outline">Processed</Badge>
          ) : (
            <Badge variant="outline">Processing</Badge>
          )}
        </CardTitle>

        <div className="space-x-6">
          <Button variant="secondary" size={"sm"}>
            Analyze
          </Button>
          <Dialog open={deleteModal} onOpenChange={setDeleteModal}>
            <DialogTrigger>
              <Button variant="destructive" size={"sm"}>
                Delete File
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you sure absolutely sure?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete the
                  file from our database and all previous data will be lost.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button disabled={mutation.isLoading} variant="secondary">
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    mutation.mutate();
                  }}
                  disabled={mutation.isLoading}
                  variant="destructive"
                >
                  {mutation.isLoading ? (
                    <ClipLoader size={20} color="white" />
                  ) : (
                    "Confirm"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent className="mt-4 grid grid-cols-8 w-full">
        {showFullText ? (
          <ChevronUp className="cursor-pointer" onClick={toggleText} />
        ) : (
          <ChevronDown className="cursor-pointer" onClick={toggleText} />
        )}
        <p className="text-sm text-gray-600 col-span-7">
          {showFullText ? item?.transcript : item?.transcript?.slice(0, 100)}
        </p>
      </CardContent>
    </Card>
  );
};

export default FileUploadCard;
