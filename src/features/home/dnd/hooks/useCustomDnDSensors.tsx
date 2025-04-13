import { useSensor, useSensors, TouchSensor, MouseSensor } from '@dnd-kit/core';

const useCustomDnDSensors = () => {

    const touchSensor = useSensor(TouchSensor, {
        // Press delay of 250ms, with tolerance of 5px of movement
        activationConstraint: {
            delay: 250,
            tolerance: 5,
        },
    });


    const mouseSensor = useSensor(MouseSensor, {
        // Require the mouse to move by 8 pixels before activating
        activationConstraint: {
            distance: 8, 
        },
    });

    return useSensors(mouseSensor, touchSensor);
}

export default useCustomDnDSensors;