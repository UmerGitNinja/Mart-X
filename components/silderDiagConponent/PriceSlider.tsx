"use client";

import Slider from "@mui/material/Slider";

interface PriceSliderProps {
  setValue: (value: number) => void;
}
const PriceSlider: React.FC<PriceSliderProps> = ({ setValue }) => {
  const ValueArray = [
    { value: 0 },
    { value: 50 },
    { value: 60 },
    { value: 70 },
    { value: 80 },
    { value: 90 },
    { value: 100 },
    { value: 110 },
    { value: 120 },
    { value: 130 },
    { value: 140 },
    { value: 150 },
    { value: 160 },
    { value: 170 },
    { value: 180 },
    { value: 190 },
    { value: 200 },
    { value: 210 },
    { value: 220 },
    { value: 230 },
    { value: 240 },
    { value: 250 },
    { value: 260 },
    { value: 270 },
    { value: 280 },
    { value: 290 },
    { value: 300 },
    { value: 310 },
    { value: 320 },
    { value: 330 },
    { value: 340 },
    { value: 350 },
    { value: 360 },
    { value: 370 },
    { value: 380 },
    { value: 390 },
    { value: 400 },
    { value: 410 },
    { value: 420 },
    { value: 430 },
    { value: 440 },
    { value: 450 },
    { value: 460 },
    { value: 470 },
    { value: 480 },
    { value: 490 },
    { value: 500 },
  ];

  return (
    <Slider
      onChange={(e, value) =>
        setValue(typeof value === "number" ? ValueArray[value].value : 0)
      }
      valueLabelDisplay="off"
      marks
      min={0}
      step={1}
      max={ValueArray.length - 1}
      style={{
        width: 600,
      }}
      sx={{
        "& .MuiSlider-thumb": {
          borderRadius: "100%",
          width: "20px",
          height: "20px",
          color: "white",
          boxShadow: "0 4px 4px rgba(102,123,154,.25)",
        },
      }}
      className="!h-2 max-w-full !rounded-sm text-primary"
    />
  );
};

export default PriceSlider;
