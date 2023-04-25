import { VStack, Button, HStack, Box, Image } from "@chakra-ui/react";
import { useState } from "react";

type FileUploadProps = {
  updateUpload: (files: File[]) => void;
  maxFiles: number;
  title: string
};

const FileUpload: React.FC<FileUploadProps> = ({ updateUpload, maxFiles, title }) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files).slice(0, maxFiles);
      setSelectedFiles(files);

      const urls = files.map((file) => URL.createObjectURL(file));
      setPreviewUrls(urls);
      updateUpload(files);
    }
  };

  return (
    <VStack
      justifyContent="center"
      alignItems="center"
      flexDirection="row"
      gap-7
    >
      <input
        type="file"
        multiple
        onChange={handleFileChange}
        style={{ display: 'none' }}
        id="file-upload"
      />
      <Button
        as="label"
        htmlFor="file-upload"
        bg={"green.400"}
        _hover={{
          bg: "green.600"
        }}
        isDisabled={selectedFiles.length >= maxFiles}
      >
        选择{title}
      </Button>
      <HStack spacing={2}>

        {previewUrls.map((url, index) => (
          <Box key={index} width="100px" height="100px" overflow="hidden">
            <Image w-20 h-20 rounded={"7px"} src={url} alt={`预览 ${index}`} objectFit="cover" />
          </Box>
        ))}
      </HStack>
    </VStack>
  );
};

export default FileUpload;
