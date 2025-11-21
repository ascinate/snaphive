import React, { useState } from 'react'
import { TouchableOpacity, TextInput } from 'react-native'
import DatePicker from 'react-native-date-picker'
import { SafeAreaView } from 'react-native-safe-area-context'

export default () => {
  const [date, setDate] = useState(new Date())
  const [openDate, setopenDate] = useState(false)

  // Format date → DD/MM/YYYY
  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
  }

  return (
    <SafeAreaView style={{ padding: 20 }}>

      <TouchableOpacity onPress={() => setopenDate(true)}>
        <TextInput
          placeholder="Select Date"
          value={formatDate(date)}
          editable={false}
          style={{
            borderWidth: 1,
            borderColor: '#ccc',
            padding: 10,
            borderRadius: 8,
          }}
        />
      </TouchableOpacity>

      <DatePicker
        modal
        mode="date"
        open={openDate}     
        date={date}
        onConfirm={(selectedDate) => {
          setopenDate(false)
          setDate(selectedDate)
        }}
        onCancel={() => setopenDate(false)}
      />
    </SafeAreaView>
  )
}
