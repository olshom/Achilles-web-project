import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import achievementService from "../services/achievements.js";
import {
    Container,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Paper, Button,
} from '@mui/material'

const Achievement = ({achievementId}) => {
    console.log('message',achievementId);
//    const id = useParams().id
    const [achievement, setAchievement] = useState(null);

    const fetchAchievement = async () => {
        try {
            const achievement = await achievementService.getAchievementById(achievementId);
            setAchievement(achievement);
        }catch(error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (!achievement) {
            fetchAchievement();
        }
    }, [])

    const readableDate = achievement ? new Date(achievement.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }):null;

    if (!achievement) {
        return "Loading...";
    }
    return (
        <TableContainer component={Paper}>
            <Table>
                <colgroup>
                    <col style={{ width: '20%' }} />
                    <col style={{ width: '80%' }} />
                </colgroup>
                <TableBody>
                    <TableRow>
                        <TableCell sx={{ fontWeight: 'bold', bgcolor: '#f5f5f5' }}>
                            Achievement
                        </TableCell>
                        <TableCell>{achievement.type}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{ fontWeight: 'bold', bgcolor: '#f5f5f5' }}>
                            Description
                        </TableCell>
                        <TableCell>{achievement.description}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{ fontWeight: 'bold', bgcolor: '#f5f5f5' }}>
                            Date
                        </TableCell>
                        <TableCell>{readableDate}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{ fontWeight: 'bold', bgcolor: '#f5f5f5' }}>
                            User
                        </TableCell>
                        <TableCell>
                            {achievement.user.firstName} {achievement.user.lastName}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{ fontWeight: 'bold', bgcolor: '#f5f5f5' }}>
                            Belt
                        </TableCell>
                        <TableCell>{achievement.user.belt}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{ bgcolor: '#f5f5f5' }}></TableCell>
                        <TableCell>
                            <Button
                                color="primary"
                                variant="contained"
                                component={Link}
                                to={`/users/${achievement.user.id}`}
                            >
                                View User
                            </Button>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    )
};

export default Achievement;