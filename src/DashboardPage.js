import React, {useEffect} from "react";
import './DashboardPage.css'
import { useNavigate } from 'react-router-dom';
import { Pie, measureTextWidth } from "@ant-design/plots";

const AUTH_TOKEN = 'auth_token';
const scenarios = [
  {name: "active", value: 13, type: "Активные"},
  {name: "noActive", value: 4, type: "Не активные"},
  {name: "complated", value: 7, type: "Завершенные"},
];
const lists = [
  {name: "active", value: 4, type: "Активные"},
  {name: "noActive", value: 5, type: "Не активные"},
  {name: "complated", value: 3, type: "Завершенные"},
];
const dialogues = [
  {name: "active", value: 5, type: "Активные"},
  {name: "noActive", value: 5, type: "Не активные"},
  {name: "complated", value: 4, type: "Завершенные"},
];

export default function DashboardPage(props) {
  const authToken = localStorage.getItem(AUTH_TOKEN);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authToken) {
      navigate('/login');
    }
  }, [])

  const handleClick = () => {
    localStorage.removeItem(AUTH_TOKEN);
    navigate('/login');
  }

  const renderStatistic = (containerWidth, text, style) => {
    const { width: textWidth, height: textHeight } = measureTextWidth(text, style);
    const R = containerWidth / 2;

    let scale = 1;

    if (containerWidth < textWidth) {
      scale = Math.min(Math.sqrt(Math.abs(Math.pow(R, 2) / (Math.pow(textWidth / 2, 2) + Math.pow(textHeight, 2)))), 1);
    }

    const textStyleStr = `width:${containerWidth}px;`;
    return `<div style="${textStyleStr};font-size:${scale}em;line-height:${scale < 1 ? 1 : 'inherit'};">${text}</div>`;
  }

  const config = {
    appendPadding: 1,
    angleField: 'value',
    colorField: 'type',
    radius: 0.6,
    innerRadius: 0.8,
    label: {
      type: 'inner',
      offset: '-50%',
      style: {
        textAlign: 'center',
      },
      autoRotate: false,
      content: '{value}',
    },
    statistic: {
      title: {
        offsetY: -4,
        style: {
          fontSize: '15px',
          textAlign: 'center',
        },
        customHtml: (container, view, datum) => {
          const { width, height } = container.getBoundingClientRect();
          const d = Math.sqrt(Math.pow(width / 2, 2) + Math.pow(height / 2, 2));
          const text = datum ? datum.type : 'Всего';
          return renderStatistic(d, text, {
            fontSize: 10,
          });
        },
      },
      content: {
        offsetY: 4,
        style: {
          fontSize: '15px',
        },
        customHtml: (container, view, datum, data) => {
          const { width } = container.getBoundingClientRect();
          const text = datum ? datum.value : data.reduce((r, d) => r + d.value, 0);
          return renderStatistic(width, text, {
            fontSize: 32,
          });
        },
      },
    },
    interactions: [
      {
        type: 'element-selected',
      },
      {
        type: 'element-active',
      },
      {
        type: 'pie-statistic-active',
      },
    ],
  };

  return (
    <React.Fragment>
      {authToken && (
        <div className="page-layout">
          <div className="header">
            <h3 className="header__title">Сводка</h3>
            <button className="header__exit-button" onClick={handleClick}>
              Выход
            </button>
          </div>
          <div className="content">
            <Pie {...config} data={scenarios}/>
            <Pie {...config} data={lists}/>
            <Pie {...config} data={dialogues}/>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}
