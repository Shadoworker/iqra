const lettersLessons = [
    {
      id:1, name:'a-y', icon:require("../../../assets/iqra-icons/t1-lesson1-icon.png"),
      items:[
        {id:1, name:'a', value: "ا", icon:"../../../assets/iqra-icons/t1-lesson1-item1.png", sound:require("../../../assets/iqra-sounds/course1/sounds/a1.wav")},
        {id:2, name:'a.', value: "ع", icon:"../../../assets/iqra-icons/t1-lesson1-item1.png", sound:require("../../../assets/iqra-sounds/course1/sounds/a2.wav")},
        {id:3, name:'b', value: "ب", icon:"../../../assets/iqra-icons/t1-lesson1-item2.png", sound:require("../../../assets/iqra-sounds/course1/sounds/b.wav")},
        {id:4, name:'t', value: "ت", icon:"../../../assets/iqra-icons/t1-lesson1-item3.png", sound:require("../../../assets/iqra-sounds/course1/sounds/t.wav")},
        {id:5, name:'th', value: "ث", icon:"../../../assets/iqra-icons/t1-lesson1-item4.png", sound:require("../../../assets/iqra-sounds/course1/sounds/th.wav")},
        {id:6, name:'n', value: "ن", icon:"../../../assets/iqra-icons/t1-lesson1-item5.png", sound:require("../../../assets/iqra-sounds/course1/sounds/n.wav")},
        {id:7, name:'y', value: "ي", icon:"../../../assets/iqra-icons/t1-lesson1-item6.png", sound:require("../../../assets/iqra-sounds/course1/sounds/y.wav")},
      ]
    },
    {
      id:2, name:'h-j', icon:require("../../../assets/iqra-icons/t1-lesson2-icon.png"),
      items:[
        {id:1, name:'h', value:"ح",  icon:"../../../assets/iqra-icons/t1-lesson2-item1.png", sound:require("../../../assets/iqra-sounds/course1/sounds/h.wav")},
        {id:2, name:'h.', value:"خ",  icon:"../../../assets/iqra-icons/t1-lesson2-item2.png", sound:require("../../../assets/iqra-sounds/course1/sounds/h2.wav")},
        {id:3, name:'kh', value:"ﻫ",  icon:"../../../assets/iqra-icons/t1-lesson2-item3.png", sound:require("../../../assets/iqra-sounds/course1/sounds/h3.wav")},
        {id:4, name:'j', value:"ج",  icon:"../../../assets/iqra-icons/t1-lesson2-item4.png", sound:require("../../../assets/iqra-sounds/course1/sounds/j.wav")},
      ]
    },
    {
      id:3, name:'s', icon:require("../../../assets/iqra-icons/t1-lesson3-icon.png"),
      items:[
        {id:1, name:'s', value:"س",  icon:"../../../assets/iqra-icons/t1-lesson2-item1.png", sound:require("../../../assets/iqra-sounds/course1/sounds/s.wav")},
        {id:2, name:'ch', value:"ش",  icon:"../../../assets/iqra-icons/t1-lesson2-item2.png", sound:require("../../../assets/iqra-sounds/course1/sounds/sh.wav")},
        {id:3, name:'s.', value:"ص",  icon:"../../../assets/iqra-icons/t1-lesson2-item3.png", sound:require("../../../assets/iqra-sounds/course1/sounds/c.wav")},
      ]
    },
    {
        id:4, name:'w-q', icon:require("../../../assets/iqra-icons/t1-lesson4-icon.png"),
        items:[
          {id:1, name:'w', value:"و",  icon:"../../../assets/iqra-icons/t1-lesson2-item1.png", sound:require("../../../assets/iqra-sounds/course1/sounds/w.wav")},
          {id:2, name:'f', value:"ف",  icon:"../../../assets/iqra-icons/t1-lesson2-item2.png", sound:require("../../../assets/iqra-sounds/course1/sounds/f.wav")},
          {id:3, name:'g', value:"ق",  icon:"../../../assets/iqra-icons/t1-lesson2-item3.png", sound:require("../../../assets/iqra-sounds/course1/sounds/g.wav")},
          {id:4, name:'q', value:"غ",  icon:"../../../assets/iqra-icons/t1-lesson2-item3.png", sound:require("../../../assets/iqra-sounds/course1/sounds/rh.wav")},
        ]
    },
    {
        id:5, name:'z', icon:require("../../../assets/iqra-icons/t1-lesson5-icon.png"),
        items:[
          {id:1, name:'z', value:"ذ",  icon:"../../../assets/iqra-icons/t1-lesson2-item1.png", sound:require("../../../assets/iqra-sounds/course1/sounds/z.wav")},
          {id:2, name:'z.', value:"ز",  icon:"../../../assets/iqra-icons/t1-lesson2-item2.png", sound:require("../../../assets/iqra-sounds/course1/sounds/z2.wav")},
          {id:3, name:'z,', value:"ظ",  icon:"../../../assets/iqra-icons/t1-lesson2-item3.png", sound:require("../../../assets/iqra-sounds/course1/sounds/z3.wav")},
        ]
    },
    {
        id:6, name:'d-m', icon:require("../../../assets/iqra-icons/t1-lesson6-icon.png"),
        items:[
          {id:1, name:'d', value:"د",  icon:"../../../assets/iqra-icons/t1-lesson2-item1.png", sound:require("../../../assets/iqra-sounds/course1/sounds/d.wav")},
          {id:2, name:'r', value:"ر",  icon:"../../../assets/iqra-icons/t1-lesson2-item2.png", sound:require("../../../assets/iqra-sounds/course1/sounds/r.wav")},
          {id:3, name:'t', value:"ط",  icon:"../../../assets/iqra-icons/t1-lesson2-item3.png", sound:require("../../../assets/iqra-sounds/course1/sounds/t2.wav")},
          {id:4, name:'d.', value:"ض", icon:"../../../assets/iqra-icons/t1-lesson2-item3.png", sound:require("../../../assets/iqra-sounds/course1/sounds/d2.wav")},
          {id:5, name:'k', value:"ک",  icon:"../../../assets/iqra-icons/t1-lesson2-item3.png", sound:require("../../../assets/iqra-sounds/course1/sounds/k.wav")},
          {id:6, name:'l', value:"ل",  icon:"../../../assets/iqra-icons/t1-lesson2-item3.png", sound:require("../../../assets/iqra-sounds/course1/sounds/l.wav")},
          {id:7, name:'m', value:"م",  icon:"../../../assets/iqra-icons/t1-lesson2-item3.png", sound:require("../../../assets/iqra-sounds/course1/sounds/m.wav")},
        ]
    }



  ]

  export default lettersLessons;