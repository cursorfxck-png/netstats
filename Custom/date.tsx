import { Override } from "framer"
import React, { useState, useEffect } from "react"

function useDay(timezone) {
    const [day, setDay] = useState("")

    useEffect(() => {
        // Update immediately when component mounts
        updateDay()

        // Then update every minute (overkill for date, but ensures it updates at midnight)
        const interval = setInterval(updateDay, 60000)

        function updateDay() {
            const date = new Date()
            const options = {
                timeZone: timezone,
                day: "numeric", // This gives just the day number
            }
            const formatter = new Intl.DateTimeFormat("en-US", options)
            setDay(formatter.format(date))
        }

        return () => clearInterval(interval)
    }, [timezone])

    return day
}

export function CurrentDayOverride(): Override {
    // You can change this to the visitor's timezone or keep it as is
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
    const day = useDay(timezone)

    return {
        text: day,
    }
}
