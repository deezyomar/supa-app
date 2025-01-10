import { View, Text, TextInput, Button, FlatList, ListRenderItem } from 'react-native'
import React, {useState, useEffect} from 'react'
import { supabase } from '@/utils/supabase';
import {Todo} from '@/utils/interfaces'
import { Ionicons } from '@expo/vector-icons';
import AppleStyleSwipeableRow from '@/components/SwipeableRow';

const index = () => {
  const [todo, setTodo] = useState('')
  const [loading, setLoading] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);

useEffect (() => {
  loadTodos(); 
}, [])

const addTodo = async () => {
  setLoading(true)
  const {data: {user : User}} = await supabase.auth.getUser();

  const newTodo = {
    user_id: User?.id,
    task: todo,
  };

  const result = await supabase.from('todos').insert(newTodo).select().single();
  console.log('~ add Todo ~ result:', result)
  setLoading(false);
  setTodo('');
  setTodos([result.data,...todos]);
};

const loadTodos = async () => {
  const {
    data: todos,
    error,
    } = await supabase.from('todos').select('*').order('inserted_at', {ascending: false})
    if (error) {
      console.log('loadTodos ~ error', error);
    } else {
      console.log(todos)
      setTodos(todos);
    }
  };

const updateTodo = async (todo: Todo) => {
  const result = await supabase.from('todos').update({is_complete: !todo.is_complete}).eq('id', todo.id).select().single();

  const update = todos.map((t)=>(t.id === todo.id ? result.data : t))
  setTodos(update);
};
const deleteTodo = async (todo: Todo) => {
  await supabase.from('todos').delete().eq('id', todo.id);
  setTodos(todos.filter((t) =>t.id !== todo.id))
  
};

const renderRow: ListRenderItem<Todo> = ({item}) => {
return(
  <AppleStyleSwipeableRow todo={item} onToggle={() => updateTodo(item)} onDelete={() =>deleteTodo(item)}>
  <View style={{padding:12, flexDirection: 'row', gap:10, height:44}}>
    <Text style={{flex:1}}>{item.task}</Text>
    {item.is_complete && <Ionicons name="checkmark-done-outline" size={24} color="#151515" />}
    </View>
    </AppleStyleSwipeableRow>
)
}

  return (
    <View style={{flex: 1}}>
      <View style={{flexDirection: 'row', gap: 10, backgroundColor: '#151515', padding: 6}}>
      <TextInput
      value={todo}
      onChangeText={setTodo}
      placeholder='Add a Todo'
      style={{
        flex: 1,
        backgroundColor: '#363636',
        color: '#fff',
        padding: 8,
        borderWidth: 1,
        borderColor: '#2b825b',
        borderRadius: 4,
      }}

      />
      <Button title='Add' color={'#2b825b'} onPress={addTodo} disabled={loading || todo === ""}/>

      </View>
      <FlatList data={todos}
      renderItem={renderRow} />
      
      </View>
    
  )
}

export default index