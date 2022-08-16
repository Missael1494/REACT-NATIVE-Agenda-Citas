import React, { useEffect, useState } from 'react'
import { 
    Modal, 
    Text, 
    SafeAreaView, 
    Button, 
    StyleSheet, 
    TextInput, 
    View, 
    ScrollView,
    Pressable, 
    Alert
} from 'react-native'
import DatePicker from 'react-native-date-picker'

const Formulario = ({
    modalVisible, 
    //setModalVisible, 
    cerrarModal,
    setPacientes, 
    pacientes, 
    paciente: pacienteObj, 
    setPaciente: setPacienteApp
    }) => {

    const [paciente, setPaciente] = useState('');
    const [id, setId] = useState('')
    const [propietario, setPropietario] = useState('');
    const [email, setEmail] = useState('');
    const [telefono, setTelefono] = useState('');
    const [fecha, setFecha] = useState(new Date());
    const [sintomas, setSintomas] = useState('');

    useEffect(() => {
      if(Object.keys(pacienteObj).length > 0) {
        setId(pacienteObj.id)
        setPaciente(pacienteObj.paciente);
        setPropietario(pacienteObj.propietario);
        setEmail(pacienteObj.email);
        setTelefono(pacienteObj.telefono);
        setFecha(pacienteObj.fecha);
        setSintomas(pacienteObj.sintomas);

      }
    
      
    }, [pacienteObj])

    
    const handleCita = () => {
        // validar

        if ([paciente, propietario, email, telefono, fecha, sintomas].includes('')) {
            console.log('Hay error')

            Alert.alert(
                'Error',
                'Todos los campos son obligatorios',
                //[{text: 'Cancelar', style: 'canel'}, {text: 'OK'}]
            )

            return
        }


        const nuevoPaciente = {
            paciente, 
            propietario,
            email,
            telefono,
            fecha,
            sintomas
       }

        if (id) {
            // Editando
            nuevoPaciente.id = id

            const pacientesActualizados = pacientes.map( pacienteState => 
                    pacienteState.id === nuevoPaciente.id ? nuevoPaciente 
                    : pacienteState
                )

            setPacientes(pacientesActualizados)
            setPacienteApp({})
        } else {
            // nuevoPaciente
            nuevoPaciente.id = Date.now()
            setPacientes([...pacientes, nuevoPaciente])
        }

        

        //setModalVisible(!modalVisible);
        cerrarModal();
        setId('');
        setPaciente('');
        setPropietario('');
        setEmail('');
        setTelefono('');
        setFecha(new Date());
        setSintomas('');
    }

  return (
    <Modal
        animationType='slide'
        visible={modalVisible}
    >
        <SafeAreaView style={styles.contenido}>
            <ScrollView>
                <Text
                    style={styles.titulo}
                >{pacienteObj.id ? 'Editar' : 'Nueva'} {''}
                    <Text style={styles.tituloBold}>Cita</Text>
                </Text>

                <Pressable style={styles.btnCancelar}
                    onLongPress={() => {
                        //setModalVisible(!modalVisible)
                        cerrarModal(),
                        setPacienteApp({})
                        setPaciente('');
                        setPropietario('');
                        setEmail('');
                        setTelefono('');
                        setFecha(new Date());
                        setSintomas('');
                    }}
                >
                    <Text style={styles.btnCancelarTexto}>x Cancelar</Text>
                </Pressable>

                <View style={styles.campo}>
                    <Text
                        style={styles.label}
                    >
                        Nombre Paciente
                    </Text>
                    <TextInput
                        style={styles.input} 
                        placeholder='Nombre Paciente'
                        placeholderTextColor={'#666'}
                        value={paciente}
                        onChangeText={setPaciente}
                    />
                </View>

                <View style={styles.campo}>
                    <Text
                        style={styles.label}
                    >
                        Nombre Propietario
                    </Text>
                    <TextInput
                        style={styles.input} 
                        placeholder='Nombre Propietario'
                        placeholderTextColor={'#666'}
                        value={propietario}
                        onChangeText={setPropietario}
                    />
                </View>

                <View style={styles.campo}>
                    <Text
                        style={styles.label}
                    >
                        Email Propietario
                    </Text>
                    <TextInput
                        style={styles.input} 
                        placeholder='Email'
                        placeholderTextColor={'#666'}
                        keyboardType='email-address'
                        value={email}
                        onChangeText={setEmail}
                    />
                </View>

                <View style={styles.campo}>
                    <Text
                        style={styles.label}
                    >
                        Teléfono Propietario
                    </Text>
                    <TextInput
                        style={styles.input} 
                        placeholder='Teléfono Propietario'
                        placeholderTextColor={'#666'}
                        keyboardType='number-pad'
                        value={telefono}
                        onChangeText={setTelefono}
                        maxLength={10}
                    />
                </View>

                <View style={styles.campo}>
                    <Text
                        style={styles.label}
                    >
                        Fecha Alta
                    </Text>
                    <View style={styles.fechaContenedor}>
                        <DatePicker 
                            date={fecha}
                            locale='es'
                            mode=''
                            onDateChange={(date) => setFecha(date)}
                        />
                    </View>
                    
                    
                </View>

                <View style={styles.campo}>
                    <Text
                        style={styles.label}
                    >
                        Sintomas
                    </Text>
                    <TextInput
                        style={[styles.input, styles.sintomasInput]} 
                        placeholder='Sintomas'
                        placeholderTextColor={'#666'}
                        value={sintomas}
                        onChangeText={setSintomas}
                        multiline={true}
                        numberOfLines={4}
                    />
                </View>

                <Pressable style={styles.btnNuevaCita}
                    onPress={handleCita}
                >
                    <Text style={styles.btnNuevaCitaTexto}>{pacienteObj.id ? 'Editar' : 'Agregar'} Cita</Text>
                </Pressable>
            </ScrollView>
            
        </SafeAreaView>
    </Modal>
  )
}

const styles = StyleSheet.create({
    contenido: {
        backgroundColor: '#6D28D9',
        flex: 1,
    },
    titulo: {
        fontSize: 30,
        fontWeight: '600',
        textAlign: 'center',
        marginTop: 30,
        color: '#FFF'
    },
    tituloBold: {
        fontWeight: '900'
    },
    btnCancelar: {
        marginVertical: 30,
        backgroundColor: '#5827A4',
        marginHorizontal: 30,
        padding: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#FFF'
    },
    btnCancelarTexto: {
        color: '#FFF',
        textAlign: 'center',
        fontWeight: '900',
        fontSize: 16,
        textTransform: 'uppercase',

    },
    campo: {
        marginTop: 10,
        marginHorizontal: 30,
        
    },
    label: {
        color: '#FFF',
        marginBottom: 10,
        marginTop: 15,
        fontSize: 20,
        fontWeight: '600'
    },
    input: {
        backgroundColor: '#FFF',
        padding: 15,
        borderRadius: 10,
    },
    sintomasInput: {
        height: 100,
    }, 
    fechaContenedor:  {
        backgroundColor: '#FFF',
        borderRadius: 10
    },
    btnNuevaCita: {
        marginVertical: 50,
        backgroundColor: '#F59E0B',
        paddingVertical: 15,
        marginHorizontal: 30,
        borderRadius: 10
    },
    btnNuevaCitaTexto: {
        textAlign: 'center',
        color: '#5827A4',
        fontSize: 16,
        fontWeight: '900',
        textTransform: 'uppercase'

    }
})

export default Formulario