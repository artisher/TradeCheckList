import cp1 from "../assets/img/Cp/CP1.png"
import cp2 from "../assets/img/Cp/CP2.png"
import cp3 from "../assets/img/Cp/CP3.png"
import cp4 from "../assets/img/Cp/CP4.png"
import cp5 from "../assets/img/Cp/CP5.png"



import RTI1 from "../assets/img/RTI/RTI1.png"

export const StList =
    [
        {
            id: 1,
            name: "FTR(mmrza)",
            fullName: "Fail To Return",
            checkList: [
                { text: "ghablesh base dashte bashim", weight: 60, checked: false },
                { text: "khabar nabashse", weight: 40, checked: false }
            ],
            images: [
                cp1, cp1, cp1, cp1,
            ]
        },
        {
            id: 2,
            name: "FTR(Amir)",
            fullName: "Fail To Return",
            checkList: [
                {
                    type: "normal",
                    text: "یونیک بودن بیس یا ناحیه ftr یا فیلیپ",
                    weight: 20,
                    checked: false
                },

                {
                    type: "normal",
                    text: "مدت برگشت به ناحیه بیشتر از ۳ ساعت",
                    weight: -30,
                    checked: false
                },

                {
                    type: "group",
                    text: "نحوه برگشت به ناحیه",
                    options: [
                        { label: "CP", weight: 8, checked: false },
                        { label: "3DR", weight: 50, checked: false },
                        { label: "Normal", weight: 50, checked: false },
                    ]
                }
            ],
            images: [
                cp1, cp1, cp1, cp1,
            ]
        },

        {
            id: 3,
            name: "CP",
            fullName: "Compressien Price",
            checkList: [
                {
                    type: "normal",
                    text: "The left-side CP area must be strong.",
                    weight: 30,
                    checked: false
                },

                {
                    type: "normal",
                    text: "The CP line should be broken with significant momentum.",
                    weight: 30,
                    checked: false
                },
                {
                    type: "normal",
                    text: "When the CP breaks, there should be a return.",
                    weight: 30,
                    checked: false
                },
                {
                    type: "group",
                    text: "It has either reached :",
                    options: [
                        { label: "the base", weight: 10, checked: false },
                        { label: "approaching a certain level", weight: 10, checked: false },

                    ]
                }
            ],
            images: [
                cp1, cp2, cp3, cp4, cp5,
            ]
        },
        {
            id: 3,
            name: "RTI",
            fullName: "Return To Impulse",
            checkList: [
                { text: "ghablesh base dashte bashim", weight: 60, checked: false },
                { text: "khabar nabashse", weight: 40, checked: false }
            ],
            images: [
                RTI1, RTI1, RTI1, RTI1,
            ]
        },

    ]
