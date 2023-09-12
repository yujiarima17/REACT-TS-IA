import { Button } from "@/components/ui/button";
import { FileVideo, Github, Upload, Wand2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Separator } from "@/components/ui/separator";
export function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="px-6 py-3 flex items-center justify-between border-b">
        <h1 className="text xl font-bold">upload.ai</h1>
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">
            Developed in NLW IA
          </span>
          <Separator orientation="vertical" className="h-6" />

          <Button variant="outline">
            <Github className="w-4 h-4 mr-2" />
          </Button>
        </div>
      </div>
      <main className="flex-1 p-6 flex gap-6">
        <div className="flex flex-col flex-1 gap-4">
          <div className="grid grid-row-2 gap-4 flex-1">
            <Textarea
              placeholder="Inclua o prompt para a IA ..."
              className="resize-none p-4 leading-relaxed"
            />
            <Textarea
              placeholder="Resultado gerado pela IA ..."
              readOnly
              className="resize-none p-4 leading-relaxed"
            />
          </div>
          <p className="text-muted-foreground text-sm">
            Lembre-se: você pode utilizar a variável{" "}
            <code className=" text-violet-400">{"transcription"} </code>no seu
            prompt para adicionar o conteúdo da transcrição do vídeo selecionado
          </p>
        </div>
        {/* espaçamento entre os elementos, apenas funciona para display flex ou block */}
        <aside className="w-80 space-y-6">
          <form action="" className="form-y-6">
            <label
              htmlFor="video"
              className="border flex  rounded-md aspect-video cursor-pointer border-dashed text-sm flex-col gap-4 items-center justify-center text-muted-foreground hover:bg-primary/5"
            >
              <FileVideo className="w-4 h-4" />
              Selecione um vídeo
            </label>
            {/* prop sr-only remove o input visualmente da tela , mas o mantém dentro da DOM */}
            <input
              type="file"
              id="video"
              accept="video/mp4"
              className="sr-only"
            />
            <Separator />
            <div className="space-y-2">
              <Label htmlFor="transcription_prompt">
                Prompt de Transcrição
              </Label>
              <Textarea
                id="transcription_prompt"
                placeholder="Inclua palavras-chave mencionadas no vídeo separadas por vírgula (,)"
                className="h-20 leading-relaxed resize-none"
              />
            </div>
            <Button type="submit" className="w-full">
              Carregar Vídeo <Upload className="w-4 h-4 ml-2"></Upload>
            </Button>
          </form>
          <form action="" className="space-y-6">
            <div className="space-y-2">
              <Label>Prompt</Label>
              <Select defaultValue="gpt3.5" disabled>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um prompt..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="title"> Título do YouTube</SelectItem>
                  <SelectItem value="description">
                    Descrição do YouTube
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Separator />
            <div className="space-y-4">
              <Label>Temperatura</Label>
              <Slider max={1} step={0.1} min={0} />

              <span className="block text-xs text-muted-foreground italic leading-relaxed">
                Valores mais altos tendem a deixar o resultado mais criativo e
                com possíveis erros
              </span>
            </div>
            <Separator />
            <Button type="submit" className="w-full">
              Executar <Wand2 className="w-4 h-4 ml-2" />
            </Button>
          </form>
        </aside>
      </main>
    </div>
  );
}
