import { useState } from 'react';
import { FileText, Download, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

const CVDownload = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isDownloaded, setIsDownloaded] = useState(false);
  const { toast } = useToast();

  const handleDownload = () => {
    setIsDownloading(true);
    
    // Simuler un téléchargement (dans un vrai projet, ceci pointerait vers un vrai fichier)
    setTimeout(() => {
      setIsDownloading(false);
      setIsDownloaded(true);
      
      // Réinitialiser l'état après 2 secondes
      setTimeout(() => {
        setIsDownloaded(false);
      }, 2000);
      
      toast({
        title: "CV téléchargé avec succès",
        description: "Le fichier a été enregistré dans vos téléchargements.",
      });
      
      // Dans un vrai projet, ceci serait un lien vers le fichier CV
      // window.open('/path-to-cv.pdf', '_blank');
    }, 1500);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <FileText size={16} />
          CV
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Télécharger mon CV</DialogTitle>
          <DialogDescription>
            Téléchargez mon CV pour en savoir plus sur mon parcours professionnel, mes compétences et mes formations.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center justify-center py-6">
          <div className="relative w-24 h-32 bg-muted rounded-md overflow-hidden flex items-center justify-center shadow-md">
            <FileText size={32} className="text-primary" />
            <div className="absolute bottom-0 w-full bg-primary/10 py-1 px-2">
              <p className="text-xs text-center">CV.pdf</p>
            </div>
          </div>
        </div>
        <DialogFooter className="flex sm:justify-between">
          <Button variant="outline" type="button">
            Version imprimable
          </Button>
          <Button 
            onClick={handleDownload}
            disabled={isDownloading || isDownloaded}
            className="gap-2"
          >
            {isDownloading ? (
              <>
                <Download size={16} className="animate-bounce" />
                Téléchargement...
              </>
            ) : isDownloaded ? (
              <>
                <Check size={16} className="text-green-500" />
                Téléchargé
              </>
            ) : (
              <>
                <Download size={16} />
                Télécharger (PDF)
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CVDownload;