import { Button } from "@/components/ui/button";
import { Github, Wand2 } from "lucide-react";
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
import { VideoInputForm } from "./components/video-input-form";
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
          <VideoInputForm />
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
