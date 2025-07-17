import { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, 
  X, 
  Send, 
  ChevronUp,
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useTheme } from '@/hooks/use-theme';

type Message = {
  id: string;
  type: 'user' | 'bot';
  text: string;
};

const INITIAL_MESSAGES: Message[] = [
  {
    id: '1',
    type: 'bot',
    text: 'Bonjour ! Je suis l\'assistant virtuel du portfolio. Comment puis-je vous aider aujourd\'hui ?'
  }
];

const PRESET_QUESTIONS = [
  'Quels sont tes projets ?',
  'Comment te contacter ?',
  'Quelles sont tes compétences techniques ?',
  'Parle-moi de ton expérience'
];

// Fonction simple de correspondance de mots clés pour les réponses
const generateResponse = (message: string): string => {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('projet') || lowerMessage.includes('réalisation')) {
    return 'Je travaille actuellement sur "SamaSchool", une plateforme numérique de gestion scolaire. Vous pouvez voir tous mes projets dans la section Projets du site. Chaque projet utilise Laravel et Angular pour offrir des applications web robustes et performantes.';
  }
  
  if (lowerMessage.includes('contact') || lowerMessage.includes('joindre') || lowerMessage.includes('email')) {
    return 'Vous pouvez me contacter via le formulaire dans la section Contact ou directement à mon adresse email. Je suis également disponible sur LinkedIn et GitHub. N\'hésitez pas à me solliciter pour discuter de vos projets !';
  }
  
  if (lowerMessage.includes('compétence') || lowerMessage.includes('stack') || lowerMessage.includes('technologie')) {
    return 'Ma stack principale comprend Laravel (back-end), Angular (front-end), PostgreSQL (base de données), JWT (authentification) et la création d\'APIs REST. Je maîtrise également Git pour la gestion de versions et diverses méthodes agiles pour la gestion de projet.';
  }
  
  if (lowerMessage.includes('expérience') || lowerMessage.includes('parcours') || lowerMessage.includes('travail')) {
    return 'Je suis un développeur full-stack passionné avec plusieurs années d\'expérience dans la création d\'applications web. Je me spécialise dans les technologies Laravel et Angular pour créer des solutions sur mesure, sécurisées et évolutives. N\'hésitez pas à consulter la section À propos pour plus de détails !';
  }
  
  if (lowerMessage.includes('cv') || lowerMessage.includes('curriculum') || lowerMessage.includes('resume')) {
    return 'Vous pouvez télécharger mon CV en PDF en cliquant sur le bouton "Télécharger CV" en haut de la page. Il contient des informations détaillées sur mon parcours, mes compétences et mes réalisations.';
  }
  
  if (lowerMessage.includes('bonjour') || lowerMessage.includes('salut') || lowerMessage.includes('hello')) {
    return 'Bonjour ! Comment puis-je vous aider aujourd\'hui ? N\'hésitez pas à me poser des questions sur mes projets, compétences ou comment me contacter.';
  }
  
  return 'Je ne suis pas sûr de comprendre votre question. Pouvez-vous la reformuler ? Vous pouvez me demander des informations sur mes projets, mes compétences techniques ou comment me contacter.';
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  
  const toggleChat = () => setIsOpen(!isOpen);
  
  const handleSendMessage = (text: string = input) => {
    if (!text.trim()) return;
    
    // Ajouter le message de l'utilisateur
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      text: text.trim()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    
    // Simuler un délai de réponse pour plus de réalisme
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        text: generateResponse(text)
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };
  
  const handlePresetQuestion = (question: string) => {
    setInput(question);
    handleSendMessage(question);
  };
  
  // Défiler automatiquement vers le bas lors de nouveaux messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  return (
    <>
      {/* Bouton du chatbot */}
      <div className="fixed bottom-4 right-4 z-50">
        <Button 
          className={`h-14 w-14 rounded-full shadow-lg ${
            isOpen ? 'bg-destructive hover:bg-destructive/90' : 'bg-primary hover:bg-primary/90'
          }`}
          onClick={toggleChat}
        >
          {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
        </Button>
      </div>
      
      {/* Fenêtre du chatbot */}
      <div 
        className={`fixed bottom-20 right-4 w-80 sm:w-96 bg-card border border-border rounded-lg shadow-xl z-40 transition-all duration-300 ease-in-out ${
          isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 pointer-events-none'
        }`}
      >
        {/* En-tête */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center space-x-2">
            <Avatar className="h-8 w-8 bg-primary/20">
              <AvatarImage src="/favicon.ico" alt="Assistant" />
              <AvatarFallback>AI</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium">Assistant Portfolio</h3>
              <p className="text-xs text-muted-foreground">Posez-moi vos questions</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={toggleChat}>
            <ChevronUp size={18} />
          </Button>
        </div>
        
        {/* Messages */}
        <div className="p-4 h-80 overflow-y-auto bg-secondary/30">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`mb-4 flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.type === 'user' 
                    ? 'bg-primary text-primary-foreground rounded-tr-none' 
                    : 'bg-muted text-foreground rounded-tl-none'
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start mb-4">
              <div className="bg-muted text-foreground p-3 rounded-lg rounded-tl-none flex items-center space-x-1">
                <div className="h-2 w-2 bg-foreground/50 rounded-full animate-pulse"></div>
                <div className="h-2 w-2 bg-foreground/50 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="h-2 w-2 bg-foreground/50 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
        
        {/* Questions suggérées */}
        <div className="p-3 border-t border-border bg-background/80 flex flex-wrap gap-2">
          {PRESET_QUESTIONS.map((question, index) => (
            <button
              key={index}
              onClick={() => handlePresetQuestion(question)}
              className="text-xs py-1 px-2 bg-secondary rounded-full hover:bg-secondary/70 transition-colors"
            >
              {question}
            </button>
          ))}
        </div>
        
        {/* Input */}
        <div className="p-3 border-t flex items-center gap-2">
          <Input
            placeholder="Tapez votre message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1"
          />
          <Button 
            size="icon"
            disabled={!input.trim() || isTyping}
            onClick={() => handleSendMessage()}
          >
            {isTyping ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </Button>
        </div>
      </div>
    </>
  );
};

export default Chatbot;