import React, { useEffect, useState } from 'react';
import MenuItem from './menuItem';
import './additiveMenu.css';

import { getAdditivesMenu } from '../../service/request';

const AdditiveMenu = ({ open, onClose, type }) => {
  // Если тип не передан, компонент не отображаем
  if (type == null) return null;

  const [additives, setAdditives] = useState([]);
  const [price, setPrice] = useState(250);

  useEffect(() => {
    // Асинхронное получение данных о добавках
    const fetchedAdditives = async () => {
      const additives = await getAdditivesMenu(type.id);
      setAdditives(additives);
    };

    fetchedAdditives();
  }, [type]);

  return (
    <div className={`menu-container ${open ? 'visible' : 'hidden'}`}>
      <div className="menu">
        
        <h2 className="menu-title">{type.name}</h2>
        <div className="menu-grid">
          {additives.map((item, index) => (
            <MenuItem key={index} image={item.photo} title={item.name} price={item.price} />
          ))}
          <button className="close-button" onClick={onClose}>Закрыть</button>
        </div>
      </div>
    </div>
  );
};

export default AdditiveMenu;