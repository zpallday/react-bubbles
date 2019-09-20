import React, { useState } from "react";
import {axiosWithAuth} from "../utils/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  //console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [newColor, setNewColor] = useState(initialColor)

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
    console.log(color.id);
  };

  const handleNewColor = event => {
    setNewColor({ ...newColor, color: event.target.value })
  };

  const handleNewHex = event => {
    setNewColor({...newColor, code: { hex: event.target.value }
    })
  }


  const saveEdit = e => {
    e.preventDefault();
    axiosWithAuth()
      .put(`http://localhost:5000/api/colors/${colorToEdit.id}`, colorToEdit)
      .then(res => {
        console.log('UPDATE', res);
        const newColors = colors.filter(col => {
          if (col.id !== res.data.id) return col;
        });
        updateColors([...newColors, res.data]);
        console.log(colors)
      })
      .catch(error => console.log(error.response))
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is it saved right now?
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    axiosWithAuth()
      .delete(`http://localhost:5000/api/colors/${color.id}`)
      .then(res => {
        console.log('DELETE', res);
        const newColors = colors.filter(col => {
          if (col.id !== res.data) return col;
        });
        updateColors(newColors);
      })
      .catch(error => console.log(error.response))
  };

  const addColor = event => {
    event.preventDefault();
    console.log(newColor)
    axiosWithAuth()
      .post('http://localhost:5000/api/colors', newColor)
      .then(res => {
        console.log('POST', res)
      })
      .catch(error => console.log(error.response))
  }

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={() => deleteColor(color)}>
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <form onSubmit={addColor}>
          <legend>add new color</legend>
          <label>
            color name:
            <input
              onChange={handleNewColor}
              value={newColor.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={handleNewHex}
              value={newColor.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">add</button>
          </div>
        </form>
      <div className="spacer" />
      
    </div>
  );
};

export default ColorList;