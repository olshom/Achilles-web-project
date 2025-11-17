import {createSlice} from "@reduxjs/toolkit";
import achievementsService from "../services/achievements.js";


const achievementsSlice = createSlice({
    name: "achievements",
    initialState: [],
    reducers: {
        setAllAchievements: (state, action) => {
            return action.payload;
        },
        appendAchievement: (state, action) => {
            state.push(action.payload);
//            state.sort((a, b) => a.date - b.date);
        },
        deleteAchievement: (state, action) => {
            const achievementToDelete = action.payload;
            return state.filter(achievement => achievement.id !== achievementToDelete.id);
        },
        updateAchievement: (state, action) => {
            const achievementToUpdate = action.payload;
            return state.map(achievement => (achievement.id !== achievementToUpdate.id ? achievement : achievementToUpdate))
        }
    }
})

export const { setAllAchievements, appendAchievement, deleteAchievement, updateAchievement} = achievementsSlice.actions;

export const initializeAchievements = () => {
    return async (dispatch) => {
        const achievements = await achievementsService.getAllAchievements()
        dispatch(setAllAchievements(achievements));
    }
}

export const addAchievementAction = (achievement) => {
    return async (dispatch) => {
        const newAchievement = await achievementsService.addAchievement(achievement);

        dispatch(appendAchievement(newAchievement));
    }
}

export const deleteAchievementAction = (achievement) => {
    return async (dispatch) => {
        await achievementsService.deleteAchievement(achievement.id);
        dispatch(deleteAchievement(achievement));
    }
}

export const updateAchievementAction = (achievement) => {
    return async (dispatch) => {
        const updatedAchievement = await achievementsService.updateAchievement(achievement.id, achievement);
        dispatch(updateAchievement(updatedAchievement));
    }
}
export default achievementsSlice.reducer;