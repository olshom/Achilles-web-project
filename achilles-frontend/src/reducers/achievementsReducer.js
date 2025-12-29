import { createSlice } from "@reduxjs/toolkit";
import achievementsService from "../services/achievements.js";

const achievementsSlice = createSlice({
  name: "achievements",
  initialState: [],
  reducers: {
    setAllAchievements: (state, action) => {
      return action.payload.sort((a, b) => new Date(b.date) - new Date(a.date));
    },
    appendAchievement: (state, action) => {
      state.push(action.payload);
      state.sort((a, b) => new Date(b.date) - new Date(a.date));
    },
    deleteAchievement: (state, action) => {
      const achievementToDeleteId = action.payload;
      return state.filter(
        (achievement) => achievement.id !== achievementToDeleteId,
      );
    },
    updateAchievement: (state, action) => {
      const achievementToUpdate = action.payload;
      return state.map((achievement) =>
        achievement.id !== achievementToUpdate.id
          ? achievement
          : achievementToUpdate,
      );
    },
  },
});

export const {
  setAllAchievements,
  appendAchievement,
  deleteAchievement,
  updateAchievement,
} = achievementsSlice.actions;

export const initializeAchievements = () => {
  return async (dispatch) => {
    const achievements = await achievementsService.getAllAchievements();
    dispatch(setAllAchievements(achievements));
  };
};

export const addAchievementAction = (achievement) => {
  return async (dispatch) => {
    const newAchievement =
      await achievementsService.addAchievement(achievement);

    dispatch(appendAchievement(newAchievement));
  };
};

export const deleteAchievementAction = (id) => {
  return async (dispatch) => {
    await achievementsService.deleteAchievement(id);
    dispatch(deleteAchievement(id));
  };
};

export const updateAchievementAction = (achievement) => {
  return async (dispatch) => {
    const updatedAchievement = await achievementsService.updateAchievement(
      achievement.id,
      achievement,
    );
    dispatch(updateAchievement(updatedAchievement));
  };
};
export default achievementsSlice.reducer;
