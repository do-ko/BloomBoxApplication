import React, {createContext, useContext, useEffect, useState} from "react";
import { render, act } from '@testing-library/react-native';
import AxiosMockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import {BASE_URL} from "../src/config";
import { AuthContext } from '../src/context/AuthContext';
import { ImageContext } from '../src/context/ImageContext';
import { DiaryProvider, DiaryContext } from '../src/context/DiaryContext';

const axiosMock = new AxiosMockAdapter(axios);

describe('DiaryContext', () => {
  const mockUserInfo = { userId: 1 };
  const mockDiaryEntry = { diaryId: 1, title: 'Test Diary', content: 'Content here' };
  const mockPlantId = 100;
  
  const newDiaryEntry = {
    plantId: mockPlantId,
    title: 'New Diary Entry',
    entryDate: '2021-01-01',
    image: '',
    imageUrl: 'defaultDiary.jpg',
    diaryContent: 'New diary entry content'
  };

  // Setup and cleanup for axios mock
  beforeEach(() => {
    axiosMock.reset();
  });

  afterAll(() => {
    axiosMock.restore();
  });

  // Test for fetching diaries
  it('fetches diaries for a plant', async () => {
    axiosMock.onGet(`${BASE_URL}/diaries/plant/${mockPlantId}`).reply(200, [mockDiaryEntry]);

    const TestComponent = () => {
      const { getAllDiariesForPlant, diaries } = useContext(DiaryContext);

      useEffect(() => {
        getAllDiariesForPlant(mockPlantId);
      }, []);

      return (
        <div>
          {diaries.map((diary) => (
            <div key={diary.diaryId}>{diary.title}</div>
          ))}
        </div>
      );
    };

    const { findByText } = render(
      <AuthContext.Provider value={{ userInfo: mockUserInfo }}>
        <ImageContext.Provider value={{ uploadImage: jest.fn(), deleteImage: jest.fn() }}>
          <DiaryProvider>
            <TestComponent />
          </DiaryProvider>
        </ImageContext.Provider>
      </AuthContext.Provider>
    );

    
  });

    // Test for addDiary method
    it('adds a new diary entry', async () => {
      axiosMock.onPost(`${BASE_URL}/diaries`).reply(200, newDiaryEntry);
  
      const TestComponent = () => {
        const { addDiary, diaries } = useContext(DiaryContext);
  
        useEffect(() => {
          addDiary(
            newDiaryEntry.plantId, 
            newDiaryEntry.title, 
            newDiaryEntry.entryDate, 
            newDiaryEntry.image, 
            newDiaryEntry.imageUrl, 
            newDiaryEntry.diaryContent
          );
        }, []);
  
        return (
          <div>
            {diaries.map((diary) => (
              <div key={diary.title}>{diary.title}</div>
            ))}
          </div>
        );
      };
  
      const { findByText } = render(
        <AuthContext.Provider value={{ userInfo: mockUserInfo }}>
          <ImageContext.Provider value={{ uploadImage: jest.fn(), deleteImage: jest.fn() }}>
            <DiaryProvider>
              <TestComponent />
            </DiaryProvider>
          </ImageContext.Provider>
        </AuthContext.Provider>
      );
    });
});