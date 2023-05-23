import React from "react";

export default function Virtual({ active }) {
  return (
    <div className={`try__on__overlay ${active && " active_tryon_mirror"}`}>
      <div className="content try_on_container">
        <div id="JeelizVTOWidget">
          <canvas id="JeelizVTOWidgetCanvas"></canvas>
        </div>
      </div>
    </div>
  );
}
