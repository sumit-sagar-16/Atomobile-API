const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
    {
        vehicleName:{
            type: String,
            required:[true]
        },

        noOfWheels:{
            type: Number,
            required:[true]
        },

        manufacturer:{
            type: String,
            required:[true]
        },

        manufacturerImgUrl:{
            type: String,
            required:[true]
        },

        modelColours: [
            {
                colour: {
                    type: String,
                    required: [true]
                },
                imageUrl: {
                    type: String,
                    required: [true]
                }
            }
        ],

        description: {
            type: String,
            required: [true],
            maxlength: 500
        }
    },
    {
        timestamps: true
    }
) 


const Product = mongoose.model('Product', productSchema);

module.exports = Product;

