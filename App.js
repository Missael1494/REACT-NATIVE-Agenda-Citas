
import React, { useState } from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  Pressable,
  Modal,
  FlatList,
  Alert
} from 'react-native';
import Formulario from './src/components/Formulario';
import InformacionPaciente from './src/components/InformacionPaciente';
import Paciente from './src/components/Paciente';



const App = () => {

  const [modalVisible, setModalVisible] = useState(false)
  const [pacientes, setPacientes] = useState([])
  const [paciente, setPaciente] = useState({})
  const [modalPaciente, setModalPaciente] = useState(false)

  const nuevaCitaHandler = () => {
    console.log('diste click...')
    setModalVisible(!modalVisible);
  }

  const pacienteEditar = id => {
    //console.log('editando...', id);
    const pacienteEditar = pacientes.filter( paciente => paciente.id === id)
    setPaciente(pacienteEditar[0]); // indicamos posicion porque filter retorna un arreglo entonces accedemos directamente para que solo sea un objeto
  }

  const pacienteEliminar = id => {
    //console.log('eliminando...', id);
    Alert.alert(
      '¿Desea eliminar este paciente',
      'Un paciente eliminado no se puede recuperar',
      [
        { text: 'Cancelar'},
        { text: 'Si eliminar', onPress: () => {
          const pacientesActualizados = pacientes.filter( pacientesState => pacientesState.id !== id)
          setPacientes(pacientesActualizados);
        }}
      ]
    )
    

  }

  //{modalVisible && (Formulario)}
  const cerrarModal = () => {
    setModalVisible(false);
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Administrador de Citas
        {' '} 
        <Text style={styles.tituloBold}>Veterinaria</Text>
      </Text>

      <Pressable
        onPress={nuevaCitaHandler}
        style={styles.btnNuevaCita}
      >
        <Text
          style={styles.btnTextoNuevaCita}
        >
          Nueva Cita
        </Text>

      </Pressable>

      {
        pacientes.length === 0 
        ? <Text style={styles.noPacientes}>No hay pacientes aún</Text> 
        : <FlatList 
            style={styles.listado}
            data={pacientes}
            keyExtractor={(item) => item.id}
            renderItem={({item}) => {

              return (
                <Paciente 
                  item={item} 
                  setModalVisible={setModalVisible} 
                  setPaciente={setPaciente}
                  pacienteEditar={pacienteEditar}
                  pacienteEliminar={pacienteEliminar}
                  setModalPaciente={setModalPaciente}
                />
              )
            }}
          />
      }

  
      {modalVisible && (
        <Formulario 
          cerrarModal={cerrarModal}
          //modalVisible={modalVisible} 
          //setModalVisible={setModalVisible} 
          setPacientes={setPacientes}
          pacientes={pacientes}
          paciente={paciente}
          setPaciente={setPaciente}

        />)}

      

        <Modal
          visible={modalPaciente}
          animationType='fade'
        >
          <InformacionPaciente 
            paciente={paciente}
            setModalPaciente={setModalPaciente}
            setPaciente={setPaciente}
          />
        </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F3F4F6',
    flex: 1
  },
  titulo: {
    textAlign: 'center',
    fontSize: 30,
    color: '#374151',
    fontWeight: '600'
  },
  tituloBold: {
    fontWeight: '900',
    color: '#6D28D9',
  },
  btnNuevaCita: {
    backgroundColor: '#6D28D9',
    padding: 15,
    marginTop: 30,
    marginHorizontal: 20,
    borderRadius: 10
  },
  btnTextoNuevaCita: {
    textAlign: 'center',
    color: '#FFF',
    fontSize: 18,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  noPacientes: {
    marginTop: 40,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '600'
  },
  listado: {
    marginTop: 50,
    marginHorizontal: 30,
  }
})



export default App;
