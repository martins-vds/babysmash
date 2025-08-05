# 🍼 BabySmash! - Blazor WebAssembly Edition 🍼

BabySmash! is a silly game for babies and toddlers. Kids bash away at the keyboard and see colored shapes appear and bounce around the screen while hearing delightful sounds.

This is a modern **Blazor WebAssembly** conversion of the original WPF desktop application, bringing BabySmash! to any modern web browser!

## ✨ Features

- **Interactive Shapes**: Circle, square, triangle, heart, and star shapes appear when keys are pressed
- **Letter Learning**: Alphabet keys create letter shapes and speak the letter aloud
- **Animated Faces**: Shapes can have cute blinking faces
- **Colorful Animations**: Bouncing, scaling, and fading animations with CSS
- **Audio Effects**: Original sound files from the desktop version
- **Browser Safe**: Blocks problematic keyboard shortcuts while allowing safe gameplay
- **Options Menu**: Customize sound, faces, animation speed, and language
- **Responsive Design**: Works on desktop and mobile devices
- **Web Audio API**: High-quality audio playback using modern web standards

## 🎮 How to Play

1. **Open the application** in any modern web browser
2. **Click anywhere** or **press any key** to create shapes
3. **Press alphabet keys** (A-Z) to create letter shapes that speak the letter
4. **Press other keys** to create random colorful shapes
5. **Press Ctrl+Shift+Alt+O** to open the options menu
6. **Enjoy** watching the shapes bounce and animate!

## 🔧 Technical Details

### Architecture
- **Blazor WebAssembly** (.NET 8) for the application framework
- **HTML5/CSS3** for shapes and animations
- **Web Audio API** for sound effects and speech synthesis
- **JavaScript interop** for browser integration

### Key Improvements from WPF Version
- **Cross-platform**: Runs in any modern web browser
- **No installation**: Access via URL, no desktop installation required
- **Modern web standards**: Uses CSS animations instead of WPF animations
- **Browser security**: Safe keyboard handling without global hooks
- **Responsive**: Adapts to different screen sizes and devices

### Files Structure
```
├── Components/
│   └── OptionsDialog.razor          # Options/settings dialog
├── Pages/
│   └── Home.razor                   # Main game page
├── Services/
│   └── LocalizationService.cs      # Localization support
├── wwwroot/
│   ├── css/babysmash.css           # Game styles and animations
│   ├── js/babysmash.js             # JavaScript interop and audio
│   ├── sounds/                     # Original WAV sound files
│   └── Resources/Strings/          # Localization files
└── legacy/                         # Original WPF code (preserved)
```

## 🚀 Building and Running

### Prerequisites
- .NET 8 SDK
- Modern web browser

### Commands
```bash
# Build the application
dotnet build

# Run the development server
dotnet run

# Publish for deployment
dotnet publish -c Release
```

### Deployment
The published output in `bin/Release/net8.0/publish/wwwroot/` can be hosted on any static web server or CDN.

## 🎯 Browser Compatibility

- **Chrome/Edge**: Full support including Web Audio API
- **Firefox**: Full support including Web Audio API  
- **Safari**: Full support including Web Audio API
- **Mobile browsers**: Responsive design works on iOS/Android

## 📜 Original Credits

- **Created by**: Scott Hanselman
- **Original project**: [hanselman/babysmash](https://github.com/hanselman/babysmash)
- **Community contributions**: Various contributors to the original WPF version
- **Blazor conversion**: Converted from WPF to Blazor WebAssembly

## 🔄 Migration Notes

This Blazor version preserves the core functionality of the original WPF application:

### ✅ Successfully Migrated
- All shape types and animations
- Audio playback with original sound files
- Letter recognition and speech
- Options/settings functionality
- Keyboard input handling
- Colorful visual effects

### 🔄 Adapted for Web
- **Keyboard hooks** → Browser-safe event handling
- **WPF animations** → CSS animations and transitions
- **Win32 audio** → Web Audio API
- **Desktop deployment** → Web deployment
- **Windows-specific** → Cross-platform web

### 📂 Legacy Preservation
The original WPF code is preserved in the `legacy/` folder for reference and comparison.

---

## 📋 Original README (for reference)

### Overview
The BabySmash game for small kids.  

As babies or children smash on the keyboard, colored shapes, letters and numbers appear on the screen and are voiced to help breed familiarization.

Baby Smash will lock out the Windows Key, as well as Ctrl-Esc and Alt-Tab so your baby won't likely exit the application, rotate your monitor display, and so on. Pressing ALT-F4 will exit the application and Shift-Ctrl-Alt-O brings up the options dialog.

Originally developed by Scott Hanselman, based on AlphaBaby. The original version is also available: http://www.hanselman.com/babysmash/

### Original Enhancements
This version of BabySmash includes at least the following enhancements over the original:
* Keypad typing now register as numbers typed, just like the number row.
* Bug fixes, including cleaner shutdown.
* Improved sound handling.
* Ovals are added to the roster of shapes (including Circle, Heart, Hexagon, Rectangle, Square, Star, Trapezoid, Triangle), letters, and numbers.

---

## 🎉 Enjoy!

BabySmash! is designed to be a fun, safe way for babies and toddlers to explore the keyboard and see delightful results. The web version makes it accessible anywhere, anytime!

Have fun smashing! 🍼✨
