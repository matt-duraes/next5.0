import React, { useState, useEffect } from 'react';

import { Fontisto } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { ImageBackground, Text, View, FlatList, Alert, Share, Platform } from 'react-native';
import * as Linking from 'expo-linking';

import { Background } from '../../components/Background';
import { ListHeader } from '../../components/ListHeader';
import { Header } from '../../components/Header';
import { Member, MemberProps } from '../../components/Member';
import { ListDivider } from '../../components/ListDivider';
import { ButtonIcon } from '../../components/Buttonicon';
import { Load } from '../../components/Load';

import { theme } from '../../global/styles/theme';
import { api } from '../../services/api';
import { styles } from './styles';

import BannerImg from '../../assets/banner.png';
import { AppointmentProps } from '../../components/Appointment';

type Params = {
    guildSelected: AppointmentProps;
}

type GuildWidget = {
    id: string;
    name: string;
    channels: string;
    instant_invite: string;
    members: MemberProps[];


}

export function AppointmentDetails() {
    const [loading, setLoading] = useState(true);
    const route = useRoute();
    const { guildSelected } = route.params as Params;

    const [widget, setWidget] = useState<GuildWidget>({} as GuildWidget);




    async function fetchGuildWidget() {
        try {
            const response = await api.get(`/guilds/${guildSelected.guild.id}/widget.json`);
            setWidget(response.data);

        } catch {
            Alert.alert('Verifique as configurações do Servidor.');
        } finally {
            setLoading(false);
        }

    }

    function handleShareInvitation() {
        const idserver = widget.channels[0]['id'];
        console.log(idserver);
        console.log('BOM DIAAAAAAAAAAAAAAAAAAAAA PORRA');
        const message = Platform.OS === "ios"
            ? `Junte-se a ${guildSelected.guild.name}`
            : widget.instant_invite

        Share.share({
            message,
            url: ` https://discord.com/channels/725857423235219476/${idserver}`

        });

    }
    function handleOpenGuild() {
        const idserver = widget.channels[0]['id'];
        Linking.openURL(`https://discord.com/channels/725857423235219476/${idserver}`)
    }
    useEffect(() => {
        fetchGuildWidget();
    }, []);

    return (
        <Background>
            <Header
                title="Detalhes"
                action={
                    guildSelected.guild.owner &&
                    <BorderlessButton onPress={handleShareInvitation}>
                        <Fontisto
                            name="share"
                            size={24}
                            color={theme.colors.primary}
                        />

                    </BorderlessButton>
                }
            />
            <ImageBackground
                source={BannerImg}
                style={styles.banner}
            >
                <View style={styles.bannerContent}>
                    <Text style={styles.title}>
                        {guildSelected.guild.name}
                    </Text>
                    <Text style={styles.subtitle}>
                        {guildSelected.description}
                    </Text>
                </View>
            </ImageBackground>
            <ListHeader
                title="Jogadores"
                subtitle="Total"
            />
            <FlatList
                data={widget.members}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <Member data={item} />
                )}
                ItemSeparatorComponent={() => <ListDivider isCentered />}
                style={styles.members}
            />



            <View style={styles.footer}>
                <ButtonIcon
                    title="Entrar na Partida"
                    onPress={handleOpenGuild}
                />
            </View>
        </Background>
    );
}