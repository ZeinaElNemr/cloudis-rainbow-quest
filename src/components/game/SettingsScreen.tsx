
import React from "react";
import { useGame } from "@/contexts/GameContext";
import { Button } from "@/components/ui/button";
import { Music, Volume2, VolumeX, SunMedium, Vibrate, Sparkles, ArrowLeft } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { setMusicVolume, setSoundEffectsVolume } from "@/utils/soundUtils";

const SettingsScreen: React.FC = () => {
  const { settings, updateSettings, setScene, playGameSound } = useGame();
  const [musicVolume, setMusicVol] = React.useState(50);
  const [soundVolume, setSoundVol] = React.useState(50);

  const handleBrightnessChange = (value: number[]) => {
    updateSettings({ brightness: value[0] });
  };

  const handleMusicVolumeChange = (value: number[]) => {
    setMusicVol(value[0]);
    setMusicVolume(value[0] / 100);
  };

  const handleSoundVolumeChange = (value: number[]) => {
    setSoundVol(value[0]);
    setSoundEffectsVolume(value[0] / 100);
  };

  const handleSoundToggle = (checked: boolean) => {
    if (checked) {
      // Play a test sound when enabling sounds
      setTimeout(() => playGameSound("collect"), 100);
    }
    updateSettings({ sound: checked });
  };

  const handleBack = () => {
    playGameSound("collect");
    setScene("start");
  };

  return (
    <div className="relative h-full w-full overflow-auto bg-gradient-to-b from-sky-light to-sky-light/80 p-6">
      <div className="max-w-md mx-auto bg-white/90 rounded-xl p-6 shadow-lg">
        <div className="flex items-center gap-2 mb-6">
          <ArrowLeft 
            size={24} 
            className="cursor-pointer text-cloud-outline hover:text-cloud-outline/70" 
            onClick={handleBack}
          />
          <h1 className="text-2xl font-bold text-cloud-outline">Settings</h1>
        </div>
        
        <div className="space-y-8">
          {/* Sound */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {settings.sound ? <Music size={24} className="text-cloud-outline" /> : <VolumeX size={24} className="text-cloud-outline" />}
              <span className="font-medium">Sound</span>
            </div>
            <Switch 
              checked={settings.sound} 
              onCheckedChange={handleSoundToggle} 
            />
          </div>
          
          {/* Music Volume (only shown if sound is enabled) */}
          {settings.sound && (
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <Music size={24} className="text-cloud-outline" />
                <span className="font-medium">Music Volume</span>
              </div>
              <Slider
                value={[musicVolume]}
                min={0}
                max={100}
                step={1}
                className="settings-slider"
                onValueChange={handleMusicVolumeChange}
              />
            </div>
          )}
          
          {/* Sound Effects Volume (only shown if sound is enabled) */}
          {settings.sound && (
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <Volume2 size={24} className="text-cloud-outline" />
                <span className="font-medium">Sound Effects Volume</span>
              </div>
              <Slider
                value={[soundVolume]}
                min={0}
                max={100}
                step={1}
                className="settings-slider"
                onValueChange={handleSoundVolumeChange}
              />
            </div>
          )}
          
          {/* Brightness */}
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <SunMedium size={24} className="text-cloud-outline" />
              <span className="font-medium">Brightness</span>
            </div>
            <Slider
              value={[settings.brightness]}
              min={20}
              max={100}
              step={1}
              className="settings-slider"
              onValueChange={handleBrightnessChange}
            />
          </div>
          
          {/* Vibration */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Vibrate size={24} className="text-cloud-outline" />
              <span className="font-medium">Vibration</span>
            </div>
            <Switch 
              checked={settings.vibration} 
              onCheckedChange={(checked) => updateSettings({ vibration: checked })} 
            />
          </div>
          
          {/* Accessibility Mode */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Sparkles size={24} className="text-cloud-outline" />
              <span className="font-medium">Accessibility Mode</span>
            </div>
            <Switch 
              checked={settings.accessibilityMode} 
              onCheckedChange={(checked) => updateSettings({ accessibilityMode: checked })} 
            />
          </div>
          
          <div className="pt-4 text-sm text-muted-foreground">
            <p>Accessibility Mode disables flashing lights and reduces visual effects that may cause seizures.</p>
          </div>
        </div>
        
        <div className="flex justify-center mt-10">
          <Button 
            onClick={handleBack}
            className="game-button"
          >
            Save Settings
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SettingsScreen;
