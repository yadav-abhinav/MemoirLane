import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  TextField,
  Typography,
} from "@mui/material";
import { toastOptions, uploadActions } from "../../util/constants";
import { ChangeEvent, MouseEvent, useRef, useState } from "react";
import { toast } from "react-toastify";
import request from "../../util/requestHandler";

export default function Uploader({
  fetchImageData,
}: {
  fetchImageData: () => Promise<void>;
}) {
  const [speedDialOpen, openSpeedDial] = useState(false);
  const [dialogOpen, openDialog] = useState(false);
  const inputFile = useRef<HTMLInputElement>(null);

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    const action = event.currentTarget.dataset.action;
    if (action == "local" || action == "album") inputFile.current!.click();
    else if (action == "link") openDialog(true);
  };

  const handleImageUrlUpload = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const src = formData.get("url");
    toast
      .promise(request.post("media/upload/url", { src }), ...toastOptions())
      .then(() => fetchImageData());
    openDialog(false);
  };

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length) {
      toast.error("Files not uploaled!");
      return;
    }
    const files = Array.from(event.target.files);
    const formData = new FormData();
    for (const file of files) {
      const ext = file.name.split(".").pop()?.toLowerCase();
      if (!ext || !["jpg", "png", "jpeg"].includes(ext)) {
        toast.error(`Invaild file format .${ext}`);
        return;
      }
      formData.append("media-upload", file);
    }

    toast
      .promise(
        request.post("media/upload/local", formData),
        ...toastOptions(files.length)
      )
      .then(() => fetchImageData())
      .catch(() => {});
    event.target.value = "";
  };

  return (
    <>
      <SpeedDial
        ariaLabel="SpeedDial"
        sx={{
          position: "fixed",
          bottom: { md: "5rem", xs: "6.5rem" },
          right: { md: "9rem", xs: "2.5rem" },
        }}
        icon={<SpeedDialIcon />}
        onClose={() => openSpeedDial(false)}
        onOpen={() => openSpeedDial(true)}
        open={speedDialOpen}
      >
        <input
          accept="image/*"
          ref={inputFile}
          style={{ display: "none" }}
          multiple
          type="file"
          onChange={handleImageUpload}
        />
        {uploadActions.map((action) => (
          <SpeedDialAction
            data-action={action.id}
            key={action.title}
            icon={<action.Icon />}
            tooltipTitle={action.title}
            onClick={handleClick}
          />
        ))}
      </SpeedDial>

      <Dialog
        open={dialogOpen}
        onClose={() => openDialog(false)}
        PaperProps={{
          component: "form",
          onSubmit: handleImageUrlUpload,
          sx: {
            borderRadius: "0.5rem",
            p: "1rem",
          },
        }}
      >
        <DialogTitle children={"Image Link"} />
        <DialogContent>
          <DialogContentText
            children={
              "Paste the public URL of the photo that you want to upload."
            }
          />
          <DialogContentText>
            <Typography
              variant="caption"
              children={"Please Ensure that the URL is public and valid."}
            />
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="normal"
            id="url"
            name="url"
            label="Image URL"
            type="url"
            fullWidth
          />
        </DialogContent>
        <DialogActions sx={{ pr: "1.5rem" }}>
          <Button
            onClick={() => openDialog(false)}
            sx={{ borderRadius: "14px" }}
            children={"Cancel"}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{ borderRadius: "14px" }}
            children={"Upload"}
          />
        </DialogActions>
      </Dialog>
    </>
  );
}
