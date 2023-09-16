import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { FileVideo, Upload } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { ChangeEvent, FormEvent, useMemo, useRef, useState } from "react";

export function VideoInputForm() {
  const promptInputRef = useRef<HTMLTextAreaElement>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  function handleFileSelected(event: ChangeEvent<HTMLInputElement>) {
    // files será um array de um único elemeto que será o arquivo selecionado pelo usuário
    const { files } = event.currentTarget;
    if (!files) {
      return;
    }
    const selectedFile = files[0];

    setVideoFile(selectedFile);
  }
  function handleUploadVideo(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const prompt = promptInputRef.current?.value;
    if(!videoFile){
      return;
    }
    // conversão do vídeo em áudio
  }
  const previewURL = useMemo(() => {
    if (!videoFile) {
      return null;
    }
    return URL.createObjectURL(videoFile);
  }, [videoFile]);
  return (
    <form action="" className="form-y-6" onSubmit={handleUploadVideo}>
      <label
        htmlFor="video"
        className="relative border flex  rounded-md aspect-video cursor-pointer border-dashed text-sm flex-col gap-4 items-center justify-center text-muted-foreground hover:bg-primary/5"
      >
        {previewURL ? (
          <video
            src={previewURL}
            controls={false}
            className="pointer-events-none absolute inset-0"
          ></video>
        ) : (
          <>
            <FileVideo className="w-4 h-4" />
            Selecione um vídeo
          </>
        )}
      </label>
      {/* prop sr-only remove o input visualmente da tela , mas o mantém dentro da DOM */}
      <input
        type="file"
        id="video"
        accept="video/mp4"
        className="sr-only"
        onChange={handleFileSelected}
      />
      <Separator />
      <div className="space-y-2">
        <Label htmlFor="transcription_prompt">Prompt de Transcrição</Label>
        <Textarea
          ref={promptInputRef}
          id="transcription_prompt"
          placeholder="Inclua palavras-chave mencionadas no vídeo separadas por vírgula (,)"
          className="h-20 leading-relaxed resize-none"
        />
      </div>
      <Button type="submit" className="w-full">
        Carregar Vídeo <Upload className="w-4 h-4 ml-2"></Upload>
      </Button>
    </form>
  );
}
