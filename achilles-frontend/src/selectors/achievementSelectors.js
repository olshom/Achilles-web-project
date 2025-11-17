import { createSelector } from '@reduxjs/toolkit';

// Basic selectors
const selectAchievements = (state) => state.achievements;
const selectUsers = (state) => state.users;

// Memoized selector that combines achievements with user data
export const selectAchievementsWithUsers = createSelector(
    [selectAchievement, selectUsers],
    (achievement, users) => {
        return achievements.map(achievement => ({
            ...achievement,
            user: users.find(user => user.id === achievement.userId)
        }));
    }
);