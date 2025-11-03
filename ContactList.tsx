import React, {useState} from 'react'
import { StyleSheet, TextInput, Text, View, TouchableOpacity, FlatList, Alert } from "react-native";
const ContactList = () =>{
    const [contacts, setContacts] = useState([
    { id:1, name:"Mai An", phone:"090999888"},
    { id:2, name:"Vũ Bình", phone:"084522345"},
    ])
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [searchText, setSearchText] = useState("");
    const [editingId, setEditingId] = useState(null);
    const handleAdd = ()=>{
    const newContact = {
      id: contacts.length + 1,
      name,
      phone
    }
    setContacts([...contacts, newContact]);
    setName("");
    setPhone("");
    }
     const handleDelete = (id: number) => {
        Alert.alert(
          "Xác nhận xóa",
          "Bạn có chắc muốn xóa danh bạ này không?",
          [
            { text: "Hủy", style: "cancel" },
            {
              text: "Xóa",
              style: "destructive",
              onPress: () => {
                const newList = contacts.filter((s) => s.id !== id);
                setContacts(newList);
              },
            },
          ]
        );
      };
    const handleEdit = (item) => {
    setName(item.name);
    setPhone(item.phone);
    setEditingId(item.id);
    };
    const handleSaveEdit = () => {
    const updated = contacts.map(c =>
        c.id === editingId ? { ...c, name, phone } : c
    );
    setContacts(updated);
    setEditingId(null);
    setName("");
    setPhone("");
    };

  return (
    <View style={styles.container}>
          <Text style={styles.title}>DANH BẠ</Text>
    
          <TextInput
            style={styles.input}
            placeholder="Tên"
            value={name}
            onChangeText ={(text) =>setName(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Số điện thoại"
            value={phone}
            onChangeText={(text) =>setPhone(text)}
          />
         <TouchableOpacity style={styles.addBtn} onPress={editingId ? handleSaveEdit : handleAdd}>
            <Text style={styles.addText}>{editingId ? "Cập nhật" : "Thêm"}</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.input1}
          placeholder="Tìm kiếm..."
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
        />
        <FlatList
        data={contacts.filter(item => item.name.toLowerCase().includes(searchText.toLowerCase()))}
        keyExtractor={(item)=> item.id.toString()}
        renderItem={({item})=>(
            <View style={styles.contactCard}>
                <Text style={styles.icon}>💬</Text>

                <View style={{flex:1}}>
                <Text style={styles.contactName}>{item.name}</Text>
                <Text style={styles.contactPhone}>{item.phone}</Text>
                </View>

                <TouchableOpacity style={{marginRight:10}} onPress={() => handleEdit(item)}>
                    <Text style={{fontSize:18}}>✏️</Text>
                </TouchableOpacity>
                
                <TouchableOpacity onPress={() => handleDelete(item.id)}>
                    <Text style={{fontSize:18}}>🗑️</Text>
                </TouchableOpacity>
                </View>
             )}
        />
    </View>
  )
}

export default ContactList
const styles = StyleSheet.create({
     container: { 
        flex: 1, 
        padding: 20, 
        backgroundColor: "#f0f4f8" 
        },
    title:{
        fontSize: 22,
        fontWeight: "bold",
        textAlign:"center",
        marginBottom: 15, 
        color:"#c14095",
        },
    input: {
        borderWidth: 1,
        borderColor: "#c14095",
        borderRadius: 10,
        padding: 8,
        marginBottom: 10,
        backgroundColor: "#ffe4e1",
        },
    input1: {
        borderWidth: 1,
        borderColor: "#c14095",
        borderRadius: 10,
        padding: 8,
        marginBottom: 10,
        backgroundColor: "#fee8e5ff",
    },
    addBtn: {
        backgroundColor: "#c14095",
        padding: 8,
        borderRadius:15,
        alignItems: "center",
        marginBottom: 15,
        },
    addText: { 
        color: "#fff", 
        fontWeight: "bold" },
    contactCard:{
        backgroundColor:"#ffe4e1",
        flexDirection:"row",
        alignItems:"center",
        padding:12,
        borderRadius:20,
        marginBottom:10
        },
    icon:{
        fontSize:22,
        marginRight:10
        },
    contactName:{
        fontWeight:"bold",
        color:"#c14095",
        fontSize:16
        },
    contactPhone:{
        fontSize:14
        }

})