import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { FileVideo, Upload } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { ChangeEvent, FormEvent, useMemo, useRef, useState } from "react";
import { getFFmpeg } from "@/lib/ffmepg";

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
  async function convertVideoToAudio(video: File) {
    const ffmpeg = await getFFmpeg();
    await ffmpeg?.writeFile("input.mp4", await fetchFile(video));

    ffmpeg?.on("log", (log) => {
      console.log(log);
    });
    ffmpeg?.on("progress", (progress) => {
      console.log("Convert progress : " + Math.round(progress.progress * 100));
    });
    await ffmpeg?.exec([
      "-i",
      "input.mp4",
      "-map",
      "0:a",
      "-b:a",
      " 20k",
      "-acodec",
      "libmp3lame",
      "output.mp3",
    ]);
    const data = await ffmpeg.readFile("output.mp3");

    const audioFileBlob = new Blob([data], { type: "audio/mpegF" });
    const audioFile = new File([audioFileBlob], "audio.mp3", {
      type: "audio/mpeg",
    });
    return audioFile;
  }
  async function handleUploadVideo(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const prompt = promptInputRef.current?.value;
    if (!videoFile) {
      return;
    }
    const audioFile = await convertVideoToAudio(videoFile);
    console.log(audioFile);
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
function fetchFile(
  video: File
):
  | import("node_modules/@ffmpeg/ffmpeg/dist/esm/types").FileData
  | PromiseLike<import("node_modules/@ffmpeg/ffmpeg/dist/esm/types").FileData> {
  throw new Error("Function not implemented.");
}
