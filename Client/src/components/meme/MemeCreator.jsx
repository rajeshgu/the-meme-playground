import { useEffect, useRef, useState } from 'react';
import * as fabric from 'fabric';
import { ArrowUpTrayIcon, ArrowDownTrayIcon, FaceSmileIcon, TrashIcon } from '@heroicons/react/24/outline';

const MemeCreator = ({ onSave }) => {
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);
  const [image, setImage] = useState(null);
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [textColor, setTextColor] = useState('#ffffff');
  const [fontSize, setFontSize] = useState(40);
  const [fontFamily, setFontFamily] = useState('Impact');

  // Initialize canvas
  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current, {
      width: 500,
      height: 500,
      backgroundColor: '#f3f4f6',
    });
    setCanvas(canvas);

    return () => {
      canvas.dispose();
    };
  }, []);

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      fabric.Image.fromURL(event.target.result, (img) => {
        canvas.clear();
        img.scaleToWidth(canvas.width);
        img.scaleToHeight(canvas.height);
        canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
        setImage(img);
      });
    };
    reader.readAsDataURL(file);
  };

  // Add text to canvas
  const addText = (text, position) => {
    if (!canvas || !text.trim()) return;

    const textObj = new fabric.Text(text, {
      left: canvas.width / 2,
      top: position === 'top' ? 20 : canvas.height - 50,
      fill: textColor,
      fontSize: parseInt(fontSize),
      fontFamily,
      originX: 'center',
      originY: position === 'top' ? 'top' : 'bottom',
      textAlign: 'center',
      shadow: '2px 2px 4px rgba(0,0,0,0.5)',
    });

    canvas.add(textObj);
    canvas.renderAll();
  };

  // Save meme
  const handleSave = () => {
    if (!canvas) return;
    const dataURL = canvas.toDataURL({
      format: 'png',
      quality: 0.8,
    });
    onSave(dataURL);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <canvas ref={canvasRef} className="border border-gray-300 rounded-md" />
        </div>
        
        <div className="flex-1 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Top Text</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={topText}
                onChange={(e) => setTopText(e.target.value)}
                className="flex-1 border border-gray-300 rounded-md px-3 py-2"
                placeholder="Enter top text"
              />
              <button
                onClick={() => addText(topText, 'top')}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Add
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bottom Text</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={bottomText}
                onChange={(e) => setBottomText(e.target.value)}
                className="flex-1 border border-gray-300 rounded-md px-3 py-2"
                placeholder="Enter bottom text"
              />
              <button
                onClick={() => addText(bottomText, 'bottom')}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Add
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Text Color</label>
              <input
                type="color"
                value={textColor}
                onChange={(e) => setTextColor(e.target.value)}
                className="w-full h-10"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Font Size</label>
              <select
                value={fontSize}
                onChange={(e) => setFontSize(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              >
                {[20, 30, 40, 50, 60].map((size) => (
                  <option key={size} value={size}>
                    {size}px
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Font Family</label>
            <select
              value={fontFamily}
              onChange={(e) => setFontFamily(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            >
              {['Impact', 'Arial', 'Times New Roman', 'Comic Sans MS', 'Verdana'].map((font) => (
                <option key={font} value={font}>
                  {font}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleSave}
            className="w-full bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 flex items-center justify-center gap-2"
          >
            <ArrowDownTrayIcon className="h-5 w-5" />
            Save Meme
          </button>
        </div>
      </div>
    </div>
  );
};

export default MemeCreator;