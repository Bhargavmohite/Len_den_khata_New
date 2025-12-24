import { useSQLiteContext } from 'expo-sqlite';
import React, { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';


const Bank_Lists = ({refreshList}) => {
    const [banklists,setbankLists]= useState();

    const db = useSQLiteContext();
    
 const loadbank = async()=>{
            try {
                const result = await db.getAllAsync("SELECT * FROM Bank");
                setbankLists(result);
            } catch (error) {
                console.log("Failed to load bank");
            }
        }

useEffect(() => {
            loadbank();
        }, [refreshList]);
        
  return (
  <FlatList
        className='p-2 shadow-lm'
        data={banklists}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 30 }}
         renderItem={({ item }) => (
           <View>
             <Text>Bank Name :{item.bankName}</Text>
           </View>
         )}
  
        
        />
  )
}

export default Bank_Lists