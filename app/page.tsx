'use client';
import React, { useState,useEffect} from 'react';
import { SelectValue, SelectTrigger, Select,SelectItem,SelectContent} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ThumbsUp, ThumbsDown } from "lucide-react"
import { Button } from "@/components/ui/button";

import sound_p_review from './sound_ear_sort_with_refe_p.json'
import sound_n_review from './sound_ear_sort_with_refe_n.json'
import ear_p_review from'./ear_ear_sort_with_refe_p.json'
import ear_n_review from'./ear_ear_sort_with_refe_n.json'
import bass_p_review from './bass_ear_sort_with_refe_p.json'
import bass_n_review from './bass_ear_sort_with_refe_n.json'
import fit_p_review from './fit_ear_sort_with_refe_p.json'
import fit_n_review from './fit_ear_sort_with_refe_n.json'
import ANC_p_review from './ANC_ear_sort_with_refe_p.json'
import ANC_n_review from './ANC_ear_sort_with_refe_n.json'
import EQ_p_review from './EQ_ear_sort_with_refe_p.json'
import EQ_n_review from './EQ_ear_sort_with_refe_p.json'
import jbl_p_review from './jbl_ear_sort_with_refe_p.json'
import jbl_n_review from './jbl_ear_sort_with_refe_n.json'
import noise_p_review from './noisemode_ear_sort_with_refe_p.json'
import noise_n_review from './noisemode_ear_sort_with_refe_n.json'
import water_p_review from './amazon_water_humidifier_sort_with_refe_p.json'
import water_n_review from './amazon_water_humidifier_sort_with_refe_n.json'
import mist_p_review from './amazon_mist_humidifier_sort_with_refe_p.json'
import mist_n_review from './amazon_mist_humidifier_sort_with_refe_n.json'
import size_p_hum_review from './amazon_size_humidifier_sort_with_refe_p.json'
import size_n_hum_review from './amazon_size_humidifier_sort_with_refe_n.json'
import lights_p_review from './amazon_lights_humidifier_sort_with_refe_p.json'
import lights_n_review from './amazon_lights_humidifier_sort_with_refe_n.json'
// import shinnshitsu_p_review from './shinnshitsu_p.json'
// import shinnshitsu_n_review from './shinnshitsu_n.json'
// import joki_p_review from './joki_p.json'
// import joki_n_review from './joki_n.json'


// import shiyou_p_review from './shiyou_p.json'
// import shiyou_n_review from './shiyou_n.json'
// import less_review_size_p from './less_ear_size_p.json'
// import less_review_size_n from './less_ear_size_n.json'
// import less_review_onnshitsu_p from './less_ear_onnshitsu_p.json'
// import less_review_onnshitsu_n from './less_ear_onnshitsu_n.json'
// import less_review_nedann_p from './less_ear_nedann_p.json'
// import less_review_nedann_n from './less_ear_nedann_n.json'
// import less_review_saizu_p from './less_ear_saizu_p.json'
// import less_review_saizu_n from './less_ear_saizu_n.json'

interface EcComponentsProps {
  // 定义props的类型
}

const EcComponents: React.FC<EcComponentsProps> = () => {

  const [selectedData, setSelectedData] = useState<string[]>([]);
  const [negativereviewrData, setnegativereviewData] = useState<string[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<string>('');
  const [selectedGenre, setSelectedGenre] = useState<string>('');
  const [leftReferenceData, setLeftReferenceData] = useState<number[]>([]);
  const [rightReferenceData, setRightReferenceData] = useState<number[]>([]);
  const [selectedBadge,setSelectedBadge]=useState('');
  
  // 点击事件处理函数，根据不同的按钮设置不同的数据，左边
  const handleBadgeClick = (reviews: string[],reference: number[]) => {
    setSelectedData(reviews);
    setnegativereviewData([]);
    setLeftReferenceData(reference);
    setRightReferenceData([]);
  };

  const BadgeClick = (badgeWord:string) => {
    setSelectedBadge(badgeWord); // 更新选中的 badge 单词
  };

  // 点击事件处理函数，根据不同的按钮设置不同的数据，右边
  const handleOtherBadgeClick = (reviews: string[],reference:number[]) => {
    setnegativereviewData(reviews);
    setRightReferenceData(reference);
  };

  const productData: { [key: string]: string[] } = {
    "earphone": ["JBL Noise Cancelling Headphones"],
    "humidifier": ["pure enrichment Cool Mist Humidifier"]
  };
  const productGenres = Object.keys(productData);
  
  const renderReviewWithHighlight = (review:string) => {
    const sentences = review.split(/(?<=\. )/);
    // const sentences = review.split(/\. /);
    const badgeRegex = new RegExp(`\\b${selectedBadge}\\b`, 'i');
    // const sentences = review.split(/(?<=。)/);
    return (
      <div>
        {sentences.map((sentence, index) => (
            <span key={index} 
            className={badgeRegex.test(sentence) ? 'text-red-500' : ''}>
            {sentence}{' '}
          </span>
        ))}
      </div>
    );
  };

  return (
    
  <div className="flex flex-col items-center justify-center p-4">
     {/* 选择商品种类以及具体商品界面 */}
    <div className="flex justify-between space-x-2 mb-4 w-full">
      <Select onValueChange={(value) => {
          setSelectedGenre(value);
          setSelectedProduct('');  // Reset selected product when genre changes
        }}>
          <SelectTrigger className="border rounded-md py-2 px-4 ">
            <SelectValue placeholder="product genre" />
          </SelectTrigger>
        <SelectContent>
            {productGenres.map((genre, index) => (
              <SelectItem key={index} value={genre}>{genre}</SelectItem>
            ))}
        </SelectContent>
      </Select>
      <Select value={selectedProduct} onValueChange={setSelectedProduct}>
          <SelectTrigger className="border rounded-md py-2 px-4 ">
            <SelectValue placeholder="product name" />
          </SelectTrigger>
        <SelectContent>
            {(productData[selectedGenre] || []).map((name, index) => (
              <SelectItem key={index} value={name}>{name}</SelectItem>
            ))}
        </SelectContent>
      </Select>
    </div>

      {/* 选择观点界面*/}
        <div className=' flex space-x-4 mb-4 '>
          {selectedProduct === 'JBL Noise Cancelling Headphones' &&(
          <div>
            <Badge 
              className="rounded-full py-2 px-4 bg-red-500 " 
              variant="secondary"
              title='positive:93 negative:26'
              onClick={() => {
              BadgeClick('sound');
              handleBadgeClick(sound_p_review.reviews,sound_p_review.reference)
              handleOtherBadgeClick(sound_n_review.reviews,sound_n_review.reference);
              }}>
               sound
            </Badge>

      
        
            <Badge className="rounded-full py-2 px-4 bg-red-500" 
              variant="secondary"
              title='positive:27 negative:7'
              onClick={() => {
                BadgeClick('bass');
                handleBadgeClick(bass_p_review.reviews,bass_p_review.reference)
                handleOtherBadgeClick(bass_n_review.reviews,bass_n_review.reference);
              }}>
                bass
            </Badge>

            <Badge className="rounded-full py-2 px-4 bg-red-500"
              title='positive:11 negative:7'
              variant="secondary"
              onClick={() => {
                BadgeClick('fit');
                handleBadgeClick(fit_p_review.reviews,fit_p_review.reference)
                handleOtherBadgeClick(fit_n_review.reviews,fit_n_review.reference);
              }}>
                fit
            </Badge>

            <Badge className="rounded-full py-2 px-4 bg-red-500" 
              variant="secondary"
              title='positive:8 negative:5'
              onClick={() => {
                BadgeClick('ANC');
                handleBadgeClick(ANC_p_review.reviews,ANC_p_review.reference)
                handleOtherBadgeClick(ANC_n_review.reviews,ANC_n_review.reference);
              }}>
                ANC
            </Badge>
            
            <Badge className="rounded-full py-2 px-4 bg-red-500" 
              variant="secondary"
              title='positive:4 negative:2'
              onClick={() => {
                BadgeClick('EQ');
                handleBadgeClick(EQ_p_review.reviews,EQ_p_review.reference)
                handleOtherBadgeClick(EQ_n_review.reviews,EQ_n_review.reference);
              }}>
                EQ
            </Badge>

            <Badge className="rounded-full py-2 px-4 bg-blue-500" 
              variant="secondary"
              title='positive:3 negative:5'
              onClick={() => {
                BadgeClick('jbl');
                handleBadgeClick(jbl_p_review.reviews,jbl_p_review.reference)
                handleOtherBadgeClick(jbl_n_review.reviews,jbl_n_review.reference);
              }}>
                JBL
            </Badge>

            <Badge 
              className="rounded-full py-2 px-4  " 
              variant="secondary"
              title='positive:24 negative:35'
              onClick={() => {
                BadgeClick('ear');
                handleBadgeClick(ear_p_review.reviews,ear_p_review.reference)
                handleOtherBadgeClick(ear_n_review.reviews,ear_n_review.reference);
              }}>
              ear
            </Badge>

            <Badge className="rounded-full py-2 px-4" 
              variant="secondary"
              title='positive:11 negative:9'
                onClick={() => {
                BadgeClick('noise mode');
                handleBadgeClick(noise_p_review.reviews,noise_p_review.reference)
                handleOtherBadgeClick(noise_n_review.reviews,noise_n_review.reference);
                }}>
                noise mode
              </Badge>

          </div>
          )}

          {/* {selectedProduct==='Mv7n2j/aAirPods(第二世代)'&& (
            <div>
              <Badge className='className="rounded-full py-2 px-4' 
              variant='secondary'
              title='positive:20 negative:12'
              onClick={()=>{
                BadgeClick('sound');
                handleBadgeClick(less_review_size_p.reviews,less_review_size_p.reference)
                handleOtherBadgeClick(less_review_size_n.reviews,less_review_size_n.reference)
              }}>
                sound
              </Badge>

              <Badge className='className="rounded-full py-2 px-4 bg-red-500' 
              variant='secondary'
              title='positive:22 negative:2'
              onClick={()=>{
                BadgeClick('ear');
                handleBadgeClick(less_review_onnshitsu_p.reviews,less_review_onnshitsu_p.reference)
                handleOtherBadgeClick(less_review_onnshitsu_n.reviews,less_review_onnshitsu_n.reference)
              }}>
                ear
              </Badge>

              <Badge className='className="rounded-full py-2 px-4 bg-red-500' 
              variant='secondary'
              title='positive:9 negative:1'
              onClick={()=>{
                BadgeClick('bass');
                handleBadgeClick(less_review_nedann_p.reviews,less_review_nedann_p.reference)
                handleOtherBadgeClick(less_review_nedann_n.reviews,less_review_nedann_n.reference)
              }}>
                bass
              </Badge>

              <Badge className='className="rounded-full py-2 px-4 bg-blue-500' 
              variant='secondary'
              title='positive:0 negative:2'
              onClick={()=>{
                BadgeClick('サイズ');
                handleBadgeClick(less_review_saizu_p.reviews,less_review_saizu_p.reference)
                handleOtherBadgeClick(less_review_saizu_n.reviews,less_review_saizu_n.reference)
              }}>
                サイズ
              </Badge>
            </div>
          )} */}

          {selectedProduct ==='pure enrichment Cool Mist Humidifier'&& (
            <div>
              <Badge className="rounded-full py-2 px-4 bg-red-500"
                variant="secondary"
                title='positive:8 negative:2'
                onClick={() => {
                  BadgeClick('water');
                  handleBadgeClick(water_p_review.reviews,water_p_review.reference);
                  handleOtherBadgeClick(water_n_review.reviews,water_n_review.reference);
                }}>
                water
              </Badge>

              <Badge className="rounded-full py-2 px-4 bg-red-500" 
                variant="secondary"
                title='positive:6 negative:0'
                onClick={() => {
                  BadgeClick('mist');
                  handleBadgeClick(mist_p_review.reviews,mist_p_review.reference)
                  handleOtherBadgeClick(mist_n_review.reviews,mist_n_review.reference);
                }}>
                mist
              </Badge>

              <Badge className="rounded-full py-2 px-4 bg-red-500" 
                variant="secondary"
                title='positive:5 negative:0'
                onClick={() => {
                  BadgeClick('size');
                  handleBadgeClick(size_p_hum_review.reviews,size_p_hum_review.reference)
                  handleOtherBadgeClick(size_n_hum_review.reviews,size_n_hum_review.reference);
                }}>
                size
              </Badge>

              <Badge className="rounded-full py-2 px-4 bg-red-500" 
                variant="secondary"
                title='positive:3 negative:0'
                onClick={() => {
                  BadgeClick('lights');
                  handleBadgeClick(lights_p_review.reviews,lights_p_review.reference)
                  handleOtherBadgeClick(lights_n_review.reviews,lights_n_review.reference);
                }}>
                lights
              </Badge>


              {/* <Badge className="rounded-full py-2 px-4 bg-red-500" 
                variant="secondary"
                title='positive:17 negative:9'
                onClick={() => {
                  BadgeClick('蒸気');
                  handleBadgeClick(joki_p_review.reviews,joki_p_review.reference)
                  handleOtherBadgeClick(joki_n_review.reviews,joki_n_review.reference);
                }}>
                蒸気
              </Badge>

              <Badge className="rounded-full py-2 px-4 bg-red-500" 
                variant="secondary"
                title='positive:6 negative:2'
                onClick={() => {
                  BadgeClick('使用');
                  handleBadgeClick(shiyou_p_review.reviews,shiyou_p_review.reference)
                  handleOtherBadgeClick(shiyou_n_review.reviews,shiyou_n_review.reference);
                }}>
                使用
              </Badge>

              <Badge className="rounded-full py-2 px-4 bg-red-500" 
                variant="secondary"
                title='positive:6 negative:0'
                onClick={() => {
                  BadgeClick('寝室');
                  handleBadgeClick(shinnshitsu_p_review.reviews,shinnshitsu_p_review.reference)
                  handleOtherBadgeClick(shinnshitsu_n_review.reviews,shinnshitsu_n_review.reference);
                }}>
                寝室
              </Badge>

              <Badge className="rounded-full py-2 px-4 bg-blue-500" 
                variant="secondary"
                title='positive:5 negative:21'
                onClick={() => {
                  BadgeClick('乾燥');
                  handleBadgeClick(lights_p_review.reviews,lights_p_review.reference)
                  handleOtherBadgeClick(lights_n_review.reviews,lights_n_review.reference);
                }}>
                乾燥
              </Badge> */}
            </div>  )}
          </div>
      <div className="w-full flex justify-between">
       <div className="text-red-500 text-left ml-4 flex items-center">
        <ThumbsUp className="mr-2" />
        <span>{selectedBadge}(Positive)</span>
       </div>
       <div className="text-blue-500 text-right mr-4 flex items-center">
        <span>{selectedBadge}(Negative)</span>
        <ThumbsDown className="ml-2" />
       </div>
      </div>
    
     <div className="w-full mb-4 h-[600px] flex ">
        <ScrollArea className="border border-red-500 rounded-md h-[600px] w-1/2 ">
          <div className="flex flex-col space-y-2 p-4">
            {/* 根据 selectedData 数组中的内容渲染 */}
            {selectedData.map((review, index) => (
              <div key={index} className="border-b py-2">
                <div className="flex flex-col">
                <div>{renderReviewWithHighlight(review)}</div>
                <div className="text-right mt-2 text-sm text-gray-500">
                  References: {leftReferenceData[index]}
                  </div>
                </div>
              </div>
            ))}
         </div>
        </ScrollArea>
      
        
        <ScrollArea className="border border-blue-500 rounded-md h-[600px] w-1/2 ">
         <div className="flex flex-col space-y-2 p-4">
          {negativereviewrData.map((review, index) => (
           <div key={index} className="border-b py-2">
            <div className="flex flex-col">
             <div>{renderReviewWithHighlight(review)}</div>
             <div className="text-right mt-2 text-sm text-gray-500">
                  References: {rightReferenceData[index]}
             </div>
            </div>
          </div>
           ))}
          </div>
        </ScrollArea>
     
      </div>
      {/* <div className="flex justify-center items-center w-full">
      <div className="text-sm text-gray-500 dark:text-gray-400 justify-between">その他↓</div>
      </div> */}
    </div>
  );
}

interface ChevronIconProps {
  className?: string;
}

function ChevronDownIcon({ className }: ChevronIconProps) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function ChevronUpIcon({ className }: ChevronIconProps) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m18 15-6-6-6 6" />
    </svg>
  );
}
export default EcComponents;