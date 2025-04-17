
import React from "react";
import { AlertTriangle } from "lucide-react";
import { useGame } from "@/contexts/GameContext";

interface AccessibilityWarningProps {
  onContinue: () => void;
  onEnableMode: () => void;
}

const AccessibilityWarning: React.FC<AccessibilityWarningProps> = ({ 
  onContinue, 
  onEnableMode 
}) => {
  const { updateSettings } = useGame();

  const handleEnableMode = () => {
    updateSettings({ accessibilityMode: true });
    onEnableMode();
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-md mx-4">
        <div className="flex items-center gap-3 mb-4">
          <AlertTriangle size={24} className="text-destructive" />
          <h2 className="text-xl font-bold">Accessibility Notice</h2>
        </div>
        
        <p className="mb-6">
          This game includes flashing visuals (lightning, sparkles).
          If you have a light sensitivity or seizure disorder, 
          turn on Accessibility Mode to reduce visual effects.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-end">
          <button
            onClick={handleEnableMode}
            className="py-2 px-4 bg-primary text-primary-foreground rounded-md"
          >
            Enable Accessibility Mode
          </button>
          
          <button
            onClick={onContinue}
            className="py-2 px-4 bg-muted text-muted-foreground rounded-md"
          >
            Continue Anyway
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccessibilityWarning;
