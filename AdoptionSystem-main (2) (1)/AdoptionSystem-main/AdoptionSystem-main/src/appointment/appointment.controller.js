'use strict'

import Animal from '../animal/animal.model.js'
import Appointment from './appointment.model.js'

export const save = async (req, res) => {
    try {
        //Catching the data
        let data = req.body
        data.user = req.user._id
        /* //Getting the date from the body
        data.date = new Date(data.date).toISOString().slice(0, 10) */
        console.log(data.date)
        //Deleting the status
        /* delete data.status */
        //Verification of the animal exists
        let animal = await Animal.findOne({ _id: data.animal })

        if (!animal) return res.status(404).send({ message: 'Animal not found ' })
        //Validating that the animal  is not asigned in a predefined date

        //EXERCISE: The user only can has a date per day.
        let appointmentExists = await Appointment.findOne({
            $or: [
                { //Inside the or we can have  an "and"
                    animal: data.animal,
                    user: data.user
                },
                {
                    date: data.date,
                    user: data.user
                }
            
            ]
        }
        )
        if(appointmentExists) return res.status(404).send({ message: 'Appointment already exists'})

        
        //Saving
        let appointment = new Appointment(data)
        await appointment.save()

        return res.send({ message: `Appointment saved successfully, for the date ${appointment.date}` })
    } catch (err) {
        console.error(err)
        return res.estatus(500).send({ message: 'Error saving appointment', err })
    }
}
