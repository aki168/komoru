import React, { useState, useEffect } from "react";
import { Pie } from '@ant-design/plots';

const DemoPieActivityType = ({southData}) => {
  // /* 20220629 YN
  //  活動類型資料狀態初始化 */
  // const [activityTypeData, setActivityTypeData] = useState({})
  // /*20220629 YN
  // 給值取後端資料 */
  // useEffect(() => {
  //   const newContacts = {
  //     cityId: "3",
  //     dateRange: "2022-06",
  //   };
  //   fetch("http://localhost:5000/dashboard/getDashboardDataListByCondition", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json; charset=utf-8",
  //     },
  //     body: JSON.stringify(newContacts),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       // console.log(data.dataList.activeType);
  //       setActivityTypeData(data.dataList.activeType);
  //     })
  //     .catch((e) => {
  //       console.error(e);
  //     });
  // }, [])
  const data = [
    {
      type: '活動包A',
      value: southData.activeType.activePackTypeA,
    },
    {
      type: '活動包B',
      value: southData.activeType.activePackTypeB,
    },
    {
      type: '活動包C',
      value: southData.activeType.activePackTypeC,
    },
    {
      type: '活動包D',
      value: southData.activeType.activePackTypeD,
    },
    {
      type: '活動包E',
      value: southData.activeType.activePackTypeE,
    }

  ];
  const config = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 0.9,
    label: {
      type: 'inner',
      offset: '-30%',
      content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 14,
        textAlign: 'center',
      },
    },
    interactions: [
      {
        type: 'element-active',
      },
    ],
  };
  return <Pie {...config} />;
};

export default React.memo(DemoPieActivityType);