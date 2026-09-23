"use client";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronDown, Zap, Cpu, HardDrive, BatteryCharging, Server, Monitor, ArrowRight } from "lucide-react";
import { assetUrl } from "@/lib/assets";
import MachineOptions from "@/components/MachineOptions";

function GlowCard({ children, color = "#00e5ff", className = "" }: { children: React.ReactNode; color?: string; className?: string }) {
  return (
    <div className={`relative rounded-2xl p-[1px] ${className}`} style={{ background: `linear-gradient(135deg, ${color}40, transparent 50%, ${color}20)` }}>
      <div className="rounded-2xl bg-[#0c1220] h-full">{children}</div>
    </div>
  );
}

interface HardwareItem {
  name: string;
  emoji: string;
  tagline: string;
  tag: string;
  color: string;
  image?: string;
  description: string;
  whyForAI: string;
  keySpecs: { label: string; value: string }[];
  models?: { name: string; ram: string; bandwidth: string; tokPerSec: string; maxModel: string; price: string }[];
  pros: string[];
  cons: string[];
  bestFor: string;
  sizingNote: string;
  referencePrice: string;
}

interface HardwareCategory {
  id: string;
  emoji: string;
  title: string;
  subtitle: string;
  color: string;
  items: HardwareItem[];
}

const categories: HardwareCategory[] = [
  {
    id: "compact",
    emoji: "🍎",
    title: "Apple Mac Mini / Studio",
    subtitle: "เงียบ เล็ก ประหยัดไฟ, AI ตัวจริงบนโต๊ะ",
    color: "#94a3b8",
    items: [
      {
        name: "Mac Mini M4",
        emoji: "🖥️",
        tagline: "เริ่มต้นใช้ AI ในราคาจับต้องได้",
        tag: "Entry • ฿59,900",
        color: "#00e5ff",
        description: "Mac Mini M4 เป็นจุดเริ่มต้นที่ดีที่สุดสำหรับ AI ส่วนตัว ขนาดเล็กเท่าฝ่ามือ เงียบสนิทไม่มีเสียงพัดลม ใช้ไฟแค่ 20W เสียบปลั๊ก เปิดเครื่อง ถาม AI ได้เลย",
        whyForAI: "Apple Silicon M4 ใช้ Unified Memory ทำให้ RAM ทั้งหมดใช้กับ AI ได้ ไม่เหมือน PC ที่ต้องแยก VRAM ทำให้ Mac Mini 24GB รัน model ที่ PC ต้องใช้ GPU 24GB ได้",
        keySpecs: [
          { label: "Chip", value: "Apple M4 (10-core CPU, 10-core GPU)" },
          { label: "RAM", value: "16GB / 24GB / 32GB Unified Memory" },
          { label: "Bandwidth", value: "120 GB/s" },
          { label: "Storage", value: "256GB - 2TB SSD" },
          { label: "Power", value: "~20W idle, ~40W load" },
          { label: "Noise", value: "0 dB (fanless)" },
          { label: "Size", value: "12.7 x 12.7 x 5 cm" },
          { label: "Weight", value: "0.67 kg" },
          { label: "OS", value: "macOS" },
        ],
        models: [
          { name: "M4 16GB", ram: "16GB", bandwidth: "120 GB/s", tokPerSec: "~35 tok/s (7B)", maxModel: "8B-13B", price: "฿19,900" },
          { name: "M4 24GB", ram: "24GB", bandwidth: "120 GB/s", tokPerSec: "~35 tok/s (7B)", maxModel: "14B", price: "฿24,900" },
          { name: "M4 32GB", ram: "32GB", bandwidth: "120 GB/s", tokPerSec: "~35 tok/s (7B)", maxModel: "22-27B", price: "฿29,900" },
        ],
        pros: ["เงียบสนิท 0 dB, วางห้องนอนได้", "เล็กที่สุด เบาที่สุด", "ใช้ไฟน้อยมาก 20W", "ราคาถูกที่สุด", "macOS ใช้ง่าย"],
        cons: ["RAM สูงสุด 32GB", "Bandwidth 120 GB/s (ช้ากว่า Pro/Max)", "รัน model ใหญ่ (32B+) ไม่ไหว"],
        bestFor: "1-3 คน ใช้งานทั่วไป ถาม-ตอบ ค้นเอกสาร เขียนอีเมล",
        sizingNote: "ประเมินจาก workload, ไม่ใช่ reference tier ที่เสนอขาย",
        referencePrice: "฿59,900",
      },
      {
        name: "Mac Mini M4 Pro",
        emoji: "⚡",
        tagline: "จุดที่ลงตัวระหว่างราคากับประสิทธิภาพ",
        tag: "Best Seller • ฿109,900",
        color: "#00ff88",
        description: "Mac Mini M4 Pro มี RAM ได้ถึง 64GB และ Memory Bandwidth 273 GB/s ทำให้รัน model ขนาด 32B-72B ได้ เป็น sweet spot ที่คุ้มค่าที่สุด",
        whyForAI: "273 GB/s bandwidth ทำให้ inference เร็วกว่า M4 ปกติ 2 เท่า สำหรับ model ใหญ่ และ RAM 48-64GB ทำให้โหลด model 32B-72B ได้",
        keySpecs: [
          { label: "Chip", value: "Apple M4 Pro (12/14-core CPU, 16/20-core GPU)" },
          { label: "RAM", value: "24GB / 48GB / 64GB Unified Memory" },
          { label: "Bandwidth", value: "273 GB/s" },
          { label: "Storage", value: "512GB - 4TB SSD" },
          { label: "Power", value: "~30W idle, ~60W load" },
          { label: "Noise", value: "เสียงเบามาก (มีพัดลมแต่แทบไม่ได้ยิน)" },
          { label: "Size", value: "12.7 x 12.7 x 5 cm" },
          { label: "Thunderbolt", value: "3x Thunderbolt 5 (USB-C)" },
        ],
        models: [
          { name: "M4 Pro 48GB", ram: "48GB", bandwidth: "273 GB/s", tokPerSec: "~50 tok/s (7B) / ~18 tok/s (32B)", maxModel: "32B", price: "฿69,900" },
          { name: "M4 Pro 64GB", ram: "64GB", bandwidth: "273 GB/s", tokPerSec: "~50 tok/s (7B) / ~10 tok/s (72B)", maxModel: "70B (Q4)", price: "฿84,900" },
        ],
        pros: ["Bandwidth 273 GB/s, เร็วกว่า M4 2x", "RAM ถึง 64GB, รัน 70B ได้", "ยังเงียบมาก", "ขนาดเท่า M4 ไม่ใหญ่ขึ้น", "Thunderbolt 5 เร็วสุด"],
        cons: ["ราคาสูงกว่า M4 ~3x", "รัน 70B ได้แต่ค่อนข้างช้า (~10 tok/s)", "BTO ต้องรอ 1-2 สัปดาห์"],
        bestFor: "ทีม 3-8 คน ต้องการ AI ฉลาดขึ้น (32B model) หรือรัน 70B",
        sizingNote: "ประเมินจาก workload, ไม่ใช่ reference tier ที่เสนอขาย",
        referencePrice: "฿109,900 / ฿139,900",
      },
      {
        name: "Mac Studio M4 Max",
        emoji: "🏎️",
        tagline: "พลังสูงสุดของ Apple Silicon สำหรับ AI",
        tag: "Premium • ฿219,900",
        color: "#8b5cf6",
        description: "Mac Studio M4 Max มี Memory Bandwidth 546 GB/s, เร็วกว่า M4 Pro 2 เท่า และ RAM ถึง 128GB ทำให้รัน model 70B ได้เร็ว หรือรัน 100B+ ได้",
        whyForAI: "546 GB/s bandwidth คือ bottleneck หลักของ LLM inference, ยิ่ง bandwidth สูง token generation ยิ่งเร็ว 128GB RAM ทำให้โหลด 70B model ที่ full Q8 precision ได้ (คุณภาพสูงกว่า Q4)",
        keySpecs: [
          { label: "Chip", value: "Apple M4 Max (16-core CPU, 40-core GPU)" },
          { label: "RAM", value: "64GB / 128GB Unified Memory" },
          { label: "Bandwidth", value: "546 GB/s" },
          { label: "Storage", value: "1TB - 8TB SSD" },
          { label: "Power", value: "~40W idle, ~90W load" },
          { label: "Noise", value: "เสียงเบา (พัดลมทำงานเมื่อ load สูง)" },
          { label: "Size", value: "19.7 x 19.7 x 9.4 cm" },
          { label: "Thunderbolt", value: "6x Thunderbolt 5 + HDMI + SDXC" },
        ],
        models: [
          { name: "M4 Max 64GB", ram: "64GB", bandwidth: "546 GB/s", tokPerSec: "~70 tok/s (7B) / ~20 tok/s (70B Q4)", maxModel: "70B (Q4)", price: "฿99,900" },
          { name: "M4 Max 128GB", ram: "128GB", bandwidth: "546 GB/s", tokPerSec: "~70 tok/s (7B) / ~25 tok/s (70B Q8)", maxModel: "100B+", price: "฿139,900" },
        ],
        pros: ["546 GB/s, เร็วสุดใน Apple Silicon", "128GB รัน 70B Q8 (คุณภาพสูงสุด)", "รัน 100B+ model ได้", "เร็วกว่า DGX Spark สำหรับ model ≤70B"],
        cons: ["ราคาสูง", "ใหญ่กว่า Mac Mini", "BTO ต้องรอ 1-2 สัปดาห์"],
        bestFor: "ทีม 5-10 คน ที่ต้องการ AI ฉลาดที่สุด + เร็วที่สุด บน desktop",
        sizingNote: "ประเมินจาก workload, ไม่ใช่ reference tier ที่เสนอขาย",
        referencePrice: "฿219,900",
      },
    ],
  },
  {
    id: "powerstation",
    emoji: "💚",
    title: "NVIDIA Blackwell Mini PC",
    subtitle: "128GB memory ในขนาดกล่องทิชชู่, ซูเปอร์คอมพิวเตอร์ตั้งโต๊ะ",
    color: "#76B900",
    items: [
      {
        name: "ASUS Ascent GX10",
        emoji: "🟢",
        tagline: "คุ้มที่สุดสำหรับ 128GB AI machine",
        tag: "Best Value • ฿179,900",
        color: "#76B900",
        image: assetUrl("/asus-gx10.png"),
        description: "ASUS GX10 ใช้ GB10 Grace Blackwell Superchip เหมือน DGX Spark แต่ราคาถูกกว่า $1,000 เพราะ storage น้อยกว่า (1TB vs 4TB) นอกนั้นสเปคเหมือนกันทุกอย่าง",
        whyForAI: "128GB unified memory ทำให้โหลด model ถึง 200B parameters (4-bit) ได้ ซึ่ง Mac Studio 128GB ก็ทำได้เหมือนกัน แต่ GX10 มี NVIDIA GPU cores ที่ทำ training/fine-tuning ได้ดีกว่า",
        keySpecs: [
          { label: "Chip", value: "NVIDIA GB10 Grace Blackwell Superchip" },
          { label: "CPU", value: "20-core ARM (Grace)" },
          { label: "GPU", value: "Blackwell, 6,144 CUDA cores" },
          { label: "RAM", value: "128GB LPDDR5X Unified" },
          { label: "Bandwidth", value: "273 GB/s" },
          { label: "Compute", value: "1 petaFLOP FP4" },
          { label: "Storage", value: "1TB NVMe" },
          { label: "Network", value: "10GbE + ConnectX-7 SmartNIC (2x 200G)" },
          { label: "Power", value: "~150W" },
          { label: "Size", value: "15 x 15 x 5.1 cm" },
          { label: "OS", value: "DGX OS (Ubuntu-based Linux)" },
        ],
        pros: ["128GB unified memory", "ถูกกว่า DGX Spark $1,000", "รัน model ถึง 200B", "Fine-tune ได้ถึง 200B (Unsloth)", "ConnectX-7 เชื่อม 2 เครื่องได้", "1 petaFLOP FP4"],
        cons: ["Storage แค่ 1TB (DGX Spark มี 4TB)", "Bandwidth 273 GB/s (เท่า M4 Pro, ช้ากว่า M4 Max)", "Linux, ไม่คุ้นเคยเท่า macOS", "รัน 70B inference ช้ากว่า Mac Studio M4 Max"],
        bestFor: "ทีม Developer, Startup ที่ต้องการ fine-tune model หรือรัน model > 100B",
        sizingNote: "Spark-class desk box, ประเมินสเปกตาม workload",
        referencePrice: "฿179,900",
      },
      {
        name: "NVIDIA DGX Spark",
        emoji: "⚡",
        tagline: "Official NVIDIA พร้อม Enterprise Support",
        tag: "Enterprise • ฿249,900",
        color: "#76B900",
        image: assetUrl("/nvidia-dgx-spark.jpg"),
        description: "DGX Spark เป็นรุ่น official จาก NVIDIA มี 4TB storage และ NVIDIA Enterprise Support สเปคเหมือน GX10 ทุกอย่าง แค่เพิ่ม storage + support",
        whyForAI: "เหมือน GX10 ทุกอย่าง แต่ 4TB storage ทำให้เก็บ dataset ใหญ่ + หลาย model ได้ และ NVIDIA Enterprise Support ดีสำหรับองค์กรที่ต้องการ vendor support",
        keySpecs: [
          { label: "Chip", value: "NVIDIA GB10 Grace Blackwell (เหมือน GX10)" },
          { label: "RAM", value: "128GB LPDDR5X Unified" },
          { label: "Storage", value: "4TB NVMe (4x ของ GX10)" },
          { label: "Network", value: "10GbE + ConnectX-7 SmartNIC" },
          { label: "Support", value: "NVIDIA Enterprise Support" },
          { label: "Power", value: "~150W" },
          { label: "Price (MSRP)", value: "$4,699" },
        ],
        pros: ["4TB storage, เก็บ dataset + model ได้เยอะ", "NVIDIA Enterprise Support", "Official NVIDIA product"],
        cons: ["แพงกว่า GX10 ~฿70,000", "สเปค compute เหมือน GX10 ทุกอย่าง"],
        bestFor: "องค์กรที่ต้องการ official NVIDIA support + storage ใหญ่",
        sizingNote: "Spark-class desk box, ประเมินสเปกตาม workload",
        referencePrice: "฿249,900",
      },
    ],
  },
  {
    id: "server",
    emoji: "🖥️",
    title: "GPU Servers",
    subtitle: "ระดับ Data Center สำหรับ 50-500+ คนใช้พร้อมกัน",
    color: "#3b82f6",
    items: [
      {
        name: "NVIDIA L40S",
        emoji: "🔷",
        tagline: "GPU ที่คุ้มค่าที่สุดสำหรับ inference",
        tag: "Server Entry/Pro",
        color: "#3b82f6",
        description: "L40S เป็น GPU ระดับ professional ที่ออกแบบมาสำหรับ AI inference โดยเฉพาะ ราคาถูกกว่า H100 มากแต่ inference speed ดีมาก Air-cooled ไม่ต้อง liquid cooling",
        whyForAI: "48GB GDDR6 VRAM เพียงพอสำหรับ Qwen 32B แบบ full precision หรือ 72B แบบ quantized ที่ 864 GB/s bandwidth ทำ inference ได้เร็วมาก ใช้ไฟแค่ 350W air-cooled ได้",
        keySpecs: [
          { label: "VRAM", value: "48GB GDDR6" },
          { label: "Bandwidth", value: "864 GB/s" },
          { label: "CUDA Cores", value: "18,176" },
          { label: "TDP", value: "350W" },
          { label: "Cooling", value: "Air-cooled ✅" },
          { label: "Form Factor", value: "PCIe dual-slot" },
          { label: "Price (approx)", value: "~฿300,000/GPU" },
        ],
        pros: ["คุ้มค่าที่สุดสำหรับ inference (฿ต่อ tok/s)", "Air-cooled, ไม่ต้อง liquid cooling", "48GB VRAM, รัน 32B full หรือ 72B quantized", "350W, ไม่กินไฟเท่า H100"],
        cons: ["GDDR6 ไม่ใช่ HBM, bandwidth ต่ำกว่า H100", "Training ช้ากว่า H100", "ไม่มี NVLink (ใช้ PCIe bus ระหว่าง GPU)"],
        bestFor: "Inference workload 20-100+ concurrent users ในราคาที่เหมาะสม",
        sizingNote: "GPU server, ประเมินสเปกตาม workload",
        referencePrice: "฿1,190,000 / ฿2,890,000",
      },
      {
        name: "NVIDIA H100 SXM",
        emoji: "🟠",
        tagline: "The gold standard สำหรับ AI training + inference",
        tag: "Enterprise",
        color: "#f59e0b",
        description: "H100 เป็น GPU ที่ทุกบริษัท AI ใหญ่ใช้ (Google, Meta, OpenAI) 80GB HBM3 memory + 3,350 GB/s bandwidth ทั้ง training และ inference ได้หมด",
        whyForAI: "HBM3 memory ให้ bandwidth 3,350 GB/s, เร็วกว่า L40S 4 เท่า ทำให้ inference เร็วมากแม้กับ model ใหญ่ และ NVLink เชื่อม 8 GPUs ด้วย bandwidth 900 GB/s",
        keySpecs: [
          { label: "VRAM", value: "80GB HBM3" },
          { label: "Bandwidth", value: "3,350 GB/s" },
          { label: "CUDA Cores", value: "16,896 + 528 Tensor Cores" },
          { label: "TDP", value: "700W" },
          { label: "NVLink", value: "900 GB/s (4th gen)" },
          { label: "Cooling", value: "Air possible, liquid preferred" },
          { label: "Price (approx)", value: "~฿900,000/GPU" },
        ],
        pros: ["3,350 GB/s bandwidth, เร็วที่สุด (ก่อน H200)", "80GB HBM3, รัน 70B full precision single GPU", "NVLink 900 GB/s ระหว่าง GPU", "Training + inference ได้ดีทั้งคู่"],
        cons: ["ราคาสูงมาก ~฿900K/GPU", "700W ต่อ GPU, ต้องมีระบบไฟดี", "เสียงดัง ต้องอยู่ห้อง server"],
        bestFor: "องค์กรที่ต้อง training model ของตัวเอง + serve 100-500+ users",
        sizingNote: "GPU server, ประเมินสเปกตาม workload",
        referencePrice: "ติดต่อเรา",
      },
      {
        name: "NVIDIA H200 SXM",
        emoji: "🔴",
        tagline: "Next-gen HBM3e, bandwidth สูงสุดในโลก",
        tag: "Flagship",
        color: "#ef4444",
        description: "H200 ใช้ HBM3e memory 141GB, เกือบ 2 เท่าของ H100 ด้วย bandwidth 4,800 GB/s ทำให้รัน model ขนาดยักษ์อย่าง DeepSeek V3 (671B) ได้บน 8-GPU setup",
        whyForAI: "141GB ต่อ GPU × 8 GPUs = 1.1TB, พอสำหรับ model 400B+ แบบ full precision หรือ 670B MoE model 4,800 GB/s bandwidth ทำให้ inference เร็วกว่า H100 ~40%",
        keySpecs: [
          { label: "VRAM", value: "141GB HBM3e" },
          { label: "Bandwidth", value: "4,800 GB/s" },
          { label: "TDP", value: "700W" },
          { label: "NVLink", value: "900 GB/s" },
          { label: "Cooling", value: "Air or liquid" },
          { label: "8-GPU total VRAM", value: "1.1TB" },
          { label: "Price (approx)", value: "~฿1,200,000/GPU" },
        ],
        pros: ["141GB, ใหญ่ที่สุด (ก่อน B200)", "4,800 GB/s, เร็วที่สุดที่มี", "รัน DeepSeek V3 671B ได้", "Drop-in replacement สำหรับ H100"],
        cons: ["ราคาสูงมาก ~฿1.2M/GPU", "Lead time ยาว", "ต้องมี infrastructure พร้อม"],
        bestFor: "องค์กรที่ต้อง run frontier model ระดับ ChatGPT",
        sizingNote: "GPU server, ประเมินสเปกตาม workload",
        referencePrice: "ติดต่อเรา",
      },
    ],
  },
  {
    id: "storage",
    emoji: "💾",
    title: "NAS Storage",
    subtitle: "เก็บไฟล์ สำรองข้อมูล เข้าถึงจากทุกเครื่อง",
    color: "#8b5cf6",
    items: [
      {
        name: "Synology 2-Bay NAS",
        emoji: "📦",
        tagline: "เก็บไฟล์ + backup สำหรับทีมเล็ก",
        tag: "+฿19,900",
        color: "#8b5cf6",
        description: "NAS 2-Bay + 2x4TB HDD ในโหมด RAID 1 (mirror) ให้พื้นที่ใช้ 4TB แต่ถ้า HDD พังตัวนึง ข้อมูลยังอยู่ครบ เชื่อมเครือข่าย เข้าถึงจากทุกเครื่องในออฟฟิศ + มือถือ",
        whyForAI: "เก็บเอกสารสำหรับ RAG pipeline, backup ข้อมูล AI และ model files โดยไม่มีค่า cloud-storage สำหรับข้อมูลที่เก็บไว้บน NAS",
        keySpecs: [
          { label: "Bays", value: "2" },
          { label: "HDD ที่ใส่", value: "2x Seagate IronWolf 4TB" },
          { label: "RAID", value: "RAID 1 (mirror) = 4TB usable" },
          { label: "Network", value: "1GbE (standard) / 10GbE (option)" },
          { label: "Access", value: "SMB, NFS, WebDAV, Synology Drive app" },
          { label: "Power", value: "~30W" },
        ],
        pros: ["RAID 1, HDD พัง 1 ตัว ข้อมูลยังอยู่", "เข้าถึงจากมือถือ", "Synology Drive = Google Drive ส่วนตัว", "ไม่มีค่า cloud-storage สำหรับข้อมูลที่เก็บไว้บน NAS"],
        cons: ["1GbE อาจช้าสำหรับไฟล์ใหญ่ (ต้อง 10GbE switch ถ้าจะเร็ว)", "4TB อาจไม่พอสำหรับ video content"],
        bestFor: "ออฟฟิศเล็กและทีมที่ต้องการสำรองข้อมูล",
        sizingNote: "อุปกรณ์เสริม, ประเมินตาม workload",
        referencePrice: "+฿19,900",
      },
      {
        name: "Synology 4-Bay NAS",
        emoji: "🗄️",
        tagline: "พื้นที่มาก + RAID 5 ปลอดภัยกว่า",
        tag: "+฿39,900",
        color: "#8b5cf6",
        description: "NAS 4-Bay + 4x4TB ใน RAID 5 ให้พื้นที่ 12TB usable HDD พังได้ 1 ตัวโดยข้อมูลไม่หาย เหมาะกับทีมที่มีไฟล์เยอะ",
        whyForAI: "12TB เก็บ dataset ขนาดใหญ่สำหรับ fine-tuning และสำรองข้อมูลหลายเครื่องพร้อมกัน",
        keySpecs: [
          { label: "Bays", value: "4" },
          { label: "HDD ที่ใส่", value: "4x Seagate IronWolf 4TB" },
          { label: "RAID", value: "RAID 5 = 12TB usable" },
          { label: "Network", value: "1GbE (standard) / 10GbE (option)" },
          { label: "Power", value: "~50W" },
        ],
        pros: ["12TB usable, เยอะกว่า 2-Bay 3 เท่า", "RAID 5, HDD พัง 1 ตัว ข้อมูลยังอยู่", "ขยาย HDD ได้ในอนาคต"],
        cons: ["ราคาสูงกว่า 2-Bay", "ใหญ่กว่า ต้องมีที่วาง"],
        bestFor: "ออฟฟิศที่มีเอกสารเยอะและต้องการสำรองข้อมูล server",
        sizingNote: "อุปกรณ์เสริม, ประเมินตาม workload",
        referencePrice: "+฿39,900",
      },
    ],
  },
  {
    id: "power",
    emoji: "🔋",
    title: "UPS สำรองไฟ",
    subtitle: "ป้องกันไฟดับ ข้อมูลไม่เสียหาย ปิดเครื่องอัตโนมัติ",
    color: "#f59e0b",
    items: [
      {
        name: "Eaton / APC 1-3 kVA",
        emoji: "🔌",
        tagline: "สำหรับ Mac Mini / DGX Spark + NAS",
        tag: "+฿15,900",
        color: "#f59e0b",
        description: "Line Interactive UPS สำรองไฟ 1-3 kVA เพียงพอสำหรับ Mac Mini (20-60W) + NAS (30W) + จอ (30W) ไฟดับสำรองได้ 30-90 นาที พร้อม auto shutdown",
        whyForAI: "ถ้าไฟดับกะทันหันขณะ AI กำลัง index เอกสาร หรือกำลัง fine-tune อาจทำให้ข้อมูลเสียหาย UPS ให้เวลาปิดเครื่องอย่างปลอดภัย",
        keySpecs: [
          { label: "Type", value: "Line Interactive" },
          { label: "Capacity", value: "1-3 kVA" },
          { label: "Backup Time", value: "30-90 นาที (Mac Mini + NAS)" },
          { label: "Auto Shutdown", value: "✅ ผ่าน USB" },
          { label: "Outlets", value: "4-6 outlets" },
          { label: "Surge Protection", value: "✅" },
          { label: "Battery Life", value: "2-3 ปี (ต้องเปลี่ยน)" },
        ],
        pros: ["สำรองได้นาน 30-90 นาที", "Auto shutdown ป้องกันข้อมูลเสีย", "ป้องกันไฟกระชากด้วย", "ราคาไม่แพง"],
        cons: ["Battery เสื่อมใน 2-3 ปี ต้องเปลี่ยน (฿1,500-3,000)"],
        bestFor: "ทุก Compact + Powerstation deployment",
        sizingNote: "อุปกรณ์เสริม, ประเมินตาม workload",
        referencePrice: "+฿15,900",
      },
      {
        name: "Eaton 5-10 kVA Online",
        emoji: "⚡",
        tagline: "สำหรับ GPU Server, Online Double Conversion",
        tag: "+฿89,900",
        color: "#f59e0b",
        description: "Online Double Conversion UPS สำหรับ GPU Server ที่ใช้ไฟ 2-10 kW ป้องกันทั้งไฟดับ ไฟตก ไฟกระชาก ให้ clean power ตลอด พร้อม Rack-mount + Network Card",
        whyForAI: "GPU Server ใช้ไฟ 2-14 kW, ไฟดับ 1 วินาทีก็ทำให้ inference ค้าง training เสียหาย เสีย model ที่กำลัง fine-tune Online UPS ให้ zero transfer time, ไม่มี gap เลย",
        keySpecs: [
          { label: "Type", value: "Online Double Conversion" },
          { label: "Capacity", value: "5-10 kVA" },
          { label: "Backup Time", value: "5-15 นาที (ที่ full load)" },
          { label: "Transfer Time", value: "0ms (zero transfer)" },
          { label: "Form Factor", value: "Rack-mount 2U-3U" },
          { label: "Network Card", value: "✅ monitor ผ่าน web" },
          { label: "Auto Shutdown", value: "✅ SNMP / SSH" },
        ],
        pros: ["Zero transfer time, ไม่มี gap เลย", "Clean power ตลอด", "Rack-mount ใส่ตู้ Rack ได้", "Network Card monitor ผ่าน Grafana ได้"],
        cons: ["ราคาสูง", "Battery ใหญ่ หนัก", "ต้องเปลี่ยน battery ทุก 3-5 ปี"],
        bestFor: "ทุก Server tier deployment",
        sizingNote: "อุปกรณ์เสริมสำหรับ GPU server, ประเมินตาม workload",
        referencePrice: "+฿89,900",
      },
    ],
  },
];

// ─── Comparison Table ───
const comparisonData = [
  { label: "RAM สูงสุด", mini: "32GB", pro: "64GB", studio: "128GB", gx10: "128GB", spark: "128GB", l40s: "48GB/GPU", h100: "80GB/GPU" },
  { label: "Bandwidth", mini: "120", pro: "273", studio: "546", gx10: "273", spark: "273", l40s: "864", h100: "3,350" },
  { label: "tok/s (7B)", mini: "~35", pro: "~50", studio: "~70", gx10: "~50-80", spark: "~50-80", l40s: "~200", h100: "~400" },
  { label: "Max Model (Q4)", mini: "14B", pro: "70B", studio: "100B+", gx10: "200B", spark: "200B", l40s: "32B/GPU", h100: "70B/GPU" },
  { label: "ใช้ไฟ", mini: "20W", pro: "60W", studio: "90W", gx10: "150W", spark: "150W", l40s: "350W/GPU", h100: "700W/GPU" },
  { label: "เสียง", mini: "0 dB", pro: "เบามาก", studio: "เบา", gx10: "พัดลม", spark: "พัดลม", l40s: "Server", h100: "Server" },
  { label: "Fine-tune", mini: "❌", pro: "MLX LoRA", studio: "MLX LoRA", gx10: "✅ Unsloth", spark: "✅ Unsloth", l40s: "✅ Full", h100: "✅ Full" },
  { label: "ราคาเครื่อง", mini: "฿20-30K", pro: "฿70-85K", studio: "฿100-140K", gx10: "~฿105K", spark: "~฿160K", l40s: "~฿300K", h100: "~฿900K" },
];

// ─── Mobile comparison cards ───
const mobileHardwareCards = [
  { key: "mini", name: "Mac Mini M4", emoji: "🖥️", color: "#00e5ff", data: comparisonData.map(r => ({ label: r.label, value: r.mini })) },
  { key: "pro", name: "Mac Mini M4 Pro", emoji: "⚡", color: "#00ff88", data: comparisonData.map(r => ({ label: r.label, value: r.pro })) },
  { key: "studio", name: "Mac Studio M4 Max", emoji: "🏎️", color: "#8b5cf6", data: comparisonData.map(r => ({ label: r.label, value: r.studio })) },
  { key: "gx10", name: "ASUS GX10", emoji: "🟢", color: "#76B900", data: comparisonData.map(r => ({ label: r.label, value: r.gx10 })) },
  { key: "spark", name: "DGX Spark", emoji: "⚡", color: "#76B900", data: comparisonData.map(r => ({ label: r.label, value: r.spark })) },
  { key: "l40s", name: "NVIDIA L40S", emoji: "🔷", color: "#3b82f6", data: comparisonData.map(r => ({ label: r.label, value: r.l40s })) },
  { key: "h100", name: "NVIDIA H100", emoji: "🟠", color: "#f59e0b", data: comparisonData.map(r => ({ label: r.label, value: r.h100 })) },
];

function MobileHardwareComparison() {
  const [active, setActive] = useState("pro");
  const current = mobileHardwareCards.find(c => c.key === active)!;

  return (
    <div className="md:hidden">
      {/* Picker */}
      <div className="flex gap-2 overflow-x-auto pb-3 mb-4 -mx-2 px-2 pr-8 snap-x snap-mandatory scroll-smooth scrollbar-hide relative">
        {mobileHardwareCards.map((card) => (
          <button
            key={card.key}
            onClick={() => setActive(card.key)}
            className="shrink-0 flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all snap-start min-w-[60px]"
            style={{
              borderWidth: 2,
              borderStyle: "solid",
              borderColor: active === card.key ? card.color : "#1e293b",
              background: active === card.key ? card.color + "10" : "#111827",
            }}
          >
            <span className="text-lg">{card.emoji}</span>
            <span className="text-[9px] font-bold whitespace-nowrap" style={{ color: active === card.key ? "#f0f4f8" : "#64748b" }}>
              {card.name.split(" ").slice(-2).join(" ")}
            </span>
          </button>
        ))}
      </div>

      {/* Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current.key}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          <GlowCard color={current.color}>
            <div className="overflow-hidden rounded-2xl">
              <div className="flex items-center gap-3 px-4 py-3 border-b border-[#1e293b]" style={{ background: current.color + "08" }}>
                <span className="text-xl">{current.emoji}</span>
                <div>
                  <p className="text-sm font-bold text-[#f0f4f8]">{current.name}</p>
                </div>
              </div>
              <div className="divide-y divide-[#1e293b]">
                {current.data.map((row, i) => (
                  <div key={row.label} className={`flex justify-between items-center px-4 py-2.5 ${i % 2 === 0 ? "bg-[#0c1220]/30" : ""}`}>
                    <span className="text-xs text-[#94a3b8]">{row.label}</span>
                    <span className="text-sm font-mono font-medium text-[#f0f4f8]">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </GlowCard>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default function HardwareSection() {
  const [activeCategory, setActiveCategory] = useState("compact");
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const current = categories.find((c) => c.id === activeCategory)!;

  return (
    <section className="relative">
      {/* Header */}
      <div className="max-w-6xl mx-auto px-6 mb-16">
        <div className="text-center mb-12">
          <span className="text-4xl mb-4 block">⚙️</span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-[#f0f4f8] mb-4">Hardware</h2>
          <p className="text-[#94a3b8] max-w-2xl mx-auto text-base lg:text-lg">
            เลือกเครื่องที่เหมาะกับคุณ, ตั้งแต่ Mac Mini เท่าฝ่ามือ ถึง GPU Server ระดับ Data Center
          </p>
        </div>
        <MachineOptions />

        {/* Category nav */}
        <div className="relative">
          <div className="flex gap-2 overflow-x-auto pb-3 mb-8 -mx-6 px-6 pr-12 sm:mx-0 sm:px-0 sm:pr-0 sm:justify-center sm:flex-wrap sm:overflow-x-visible sm:pb-0 scrollbar-hide snap-x snap-mandatory">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => { setActiveCategory(cat.id); setExpandedItem(null); }}
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all shrink-0 snap-start ${
                  activeCategory === cat.id ? "text-[#060a14] shadow-lg" : "text-[#94a3b8] bg-[#111827] border border-[#1e293b]"
                }`}
                style={activeCategory === cat.id ? { background: cat.color, boxShadow: `0 4px 20px ${cat.color}30` } : {}}
              >
                <span>{cat.emoji}</span>
                <span className="hidden sm:inline">{cat.title.split("/")[0].split("(")[0].trim()}</span>
              </button>
            ))}
          </div>
          <div className="absolute right-0 top-0 bottom-3 w-10 bg-gradient-to-l from-[#060a14] to-transparent pointer-events-none sm:hidden" />
        </div>
      </div>

      {/* Category detail */}
      <AnimatePresence mode="wait">
        <motion.div key={current.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} className="max-w-6xl mx-auto px-6 mb-20">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-black text-[#f0f4f8] flex items-center gap-3">
              <span className="text-3xl">{current.emoji}</span> {current.title}
            </h2>
            <p className="text-sm text-[#94a3b8] mt-1">{current.subtitle}</p>
          </div>

          <div className="space-y-4">
            {current.items.map((item, i) => (
              <motion.div key={item.name} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <GlowCard color={item.color}>
                  <div className="p-5 md:p-6">
                    {item.image ? (
                      <figure className="mb-4">
                        <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-[#070b12]">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            sizes="(max-width: 768px) 100vw, 1100px"
                            className="object-contain p-5"
                          />
                        </div>
                      </figure>
                    ) : null}
                    <button onClick={() => setExpandedItem(expandedItem === item.name ? null : item.name)} className="w-full text-left">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <span className="text-3xl">{item.emoji}</span>
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3 className="text-lg font-bold text-[#f0f4f8]">{item.name}</h3>
                              <span className="text-[9px] font-bold px-2 py-0.5 rounded-full" style={{ background: item.color + "15", color: item.color }}>{item.tag}</span>
                            </div>
                            <p className="text-xs text-[#64748b]">{item.tagline}</p>
                          </div>
                        </div>
                        <motion.div animate={{ rotate: expandedItem === item.name ? 180 : 0 }}><ChevronDown size={16} className="text-[#64748b]" /></motion.div>
                      </div>
                      <p className="text-sm text-[#94a3b8] leading-relaxed">{item.description}</p>
                    </button>

                    <AnimatePresence>
                      {expandedItem === item.name && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                          <div className="mt-5 pt-5 border-t border-[#1e293b] space-y-6">

                            {/* Why for AI */}
                            <div>
                              <h4 className="text-xs font-bold text-[#f0f4f8] mb-2 flex items-center gap-2"><Zap size={12} style={{ color: item.color }} /> ทำไมเหมาะกับ AI</h4>
                              <p className="text-xs text-[#94a3b8] leading-relaxed">{item.whyForAI}</p>
                            </div>

                            {/* Key specs */}
                            <div>
                              <h4 className="text-xs font-bold text-[#f0f4f8] mb-2 flex items-center gap-2"><Cpu size={12} style={{ color: item.color }} /> สเปค</h4>
                              <div className="rounded-xl bg-[#111827] border border-[#1e293b] overflow-hidden">
                                {item.keySpecs.map((s, si) => (
                                  <div key={s.label} className={`flex justify-between px-4 py-2 text-xs ${si % 2 === 0 ? "bg-[#0c1220]/50" : ""}`}>
                                    <span className="text-[#64748b]">{s.label}</span>
                                    <span className="text-[#f0f4f8] font-mono text-right">{s.value}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Model configs (if available) */}
                            {item.models && (
                              <div>
                                <h4 className="text-xs font-bold text-[#f0f4f8] mb-2">รุ่นย่อย & AI Performance</h4>
                                <div className="overflow-x-auto -mx-2 px-2">
                                  <table className="w-full text-xs min-w-[500px]">
                                    <thead>
                                      <tr className="border-b border-[#1e293b]">
                                        <th className="text-left py-2 px-3 text-[#64748b]">รุ่น</th>
                                        <th className="text-left py-2 px-3 text-[#64748b]">RAM</th>
                                        <th className="text-left py-2 px-3 text-[#64748b]">BW</th>
                                        <th className="text-left py-2 px-3 text-[#64748b]">ความเร็ว</th>
                                        <th className="text-left py-2 px-3 text-[#64748b]">Model สูงสุด</th>
                                        <th className="text-left py-2 px-3 text-[#64748b]">ราคาเครื่อง</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {item.models.map((m, mi) => (
                                        <tr key={m.name} className={mi % 2 === 0 ? "bg-[#0c1220]/50" : ""}>
                                          <td className="py-2 px-3 text-[#f0f4f8] font-medium">{m.name}</td>
                                          <td className="py-2 px-3 text-[#94a3b8] font-mono">{m.ram}</td>
                                          <td className="py-2 px-3 text-[#94a3b8] font-mono">{m.bandwidth}</td>
                                          <td className="py-2 px-3 font-mono" style={{ color: item.color }}>{m.tokPerSec}</td>
                                          <td className="py-2 px-3 text-[#94a3b8]">{m.maxModel}</td>
                                          <td className="py-2 px-3 text-[#94a3b8] font-mono">{m.price}</td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            )}

                            {/* Pros & Cons */}
                            <div className="grid sm:grid-cols-2 gap-4">
                              <div>
                                <h4 className="text-xs font-bold text-[#00ff88] mb-2">✅ ข้อดี</h4>
                                <div className="space-y-1">
                                  {item.pros.map(p => (
                                    <div key={p} className="flex items-start gap-2 text-xs text-[#94a3b8]">
                                      <Check size={11} className="text-[#00ff88] mt-0.5 shrink-0" />{p}
                                    </div>
                                  ))}
                                </div>
                              </div>
                              <div>
                                <h4 className="text-xs font-bold text-[#f87171] mb-2">⚠️ ข้อจำกัด</h4>
                                <div className="space-y-1">
                                  {item.cons.map(c => (
                                    <div key={c} className="flex items-start gap-2 text-xs text-[#94a3b8]">
                                      <span className="text-[#f87171] shrink-0">•</span>{c}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>

                            {/* Best for + Package */}
                            <div className="flex flex-col sm:flex-row gap-3">
                              <div className="flex-1 rounded-xl p-3 bg-[#111827] border border-[#1e293b]">
                                <p className="text-[10px] text-[#64748b] mb-1">เหมาะกับ</p>
                                <p className="text-xs text-[#f0f4f8]">{item.bestFor}</p>
                              </div>
                              <div className="shrink-0 rounded-xl p-3" style={{ background: item.color + "10", border: `1px solid ${item.color}20` }}>
                                <p className="text-[10px]" style={{ color: item.color }}>จุดอ้างอิงสำหรับ sizing</p>
                                <p className="text-sm font-bold text-[#f0f4f8]">{item.sizingNote}</p>
                                <p className="text-lg font-black" style={{ color: item.color }}>{item.referencePrice}</p>
                                <a href="/contact" className="inline-flex items-center gap-1 text-[10px] font-bold mt-1" style={{ color: item.color }}>
                                  สนใจ <ArrowRight size={10} />
                                </a>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </GlowCard>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Comparison Table */}
      <div className="py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-10">
            <span className="text-3xl mb-4 block">📊</span>
            <h2 className="text-2xl md:text-4xl font-black text-[#f0f4f8] mb-3">เปรียบเทียบทุกเครื่อง</h2>
            <p className="text-sm text-[#94a3b8]">Bandwidth (GB/s) คือตัวเลขที่สำคัญที่สุดสำหรับความเร็ว AI</p>
          </div>

          {/* Mobile: Card picker */}
          <MobileHardwareComparison />

          {/* Desktop: Full table */}
          <div className="hidden md:block">
            <GlowCard color="#00e5ff">
              <div className="p-4 overflow-hidden rounded-2xl">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-[#1e293b]">
                      <th className="text-left py-3 px-3 text-[#64748b]"></th>
                      <th className="text-center py-3 px-2 text-[#94a3b8]">M4</th>
                      <th className="text-center py-3 px-2 text-[#00ff88] font-bold">M4 Pro</th>
                      <th className="text-center py-3 px-2 text-[#8b5cf6]">M4 Max</th>
                      <th className="text-center py-3 px-2 text-[#76B900]">GX10</th>
                      <th className="text-center py-3 px-2 text-[#76B900]">DGX Spark</th>
                      <th className="text-center py-3 px-2 text-[#3b82f6]">L40S</th>
                      <th className="text-center py-3 px-2 text-[#f59e0b]">H100</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonData.map((row, i) => (
                      <tr key={row.label} className={i % 2 === 0 ? "bg-[#0c1220]/50" : ""}>
                        <td className="py-2.5 px-3 text-[#94a3b8] font-medium">{row.label}</td>
                        <td className="py-2.5 px-2 text-center text-[#f0f4f8] font-mono">{row.mini}</td>
                        <td className="py-2.5 px-2 text-center text-[#f0f4f8] font-mono bg-[#00ff88]/5">{row.pro}</td>
                        <td className="py-2.5 px-2 text-center text-[#f0f4f8] font-mono">{row.studio}</td>
                        <td className="py-2.5 px-2 text-center text-[#f0f4f8] font-mono">{row.gx10}</td>
                        <td className="py-2.5 px-2 text-center text-[#f0f4f8] font-mono">{row.spark}</td>
                        <td className="py-2.5 px-2 text-center text-[#f0f4f8] font-mono">{row.l40s}</td>
                        <td className="py-2.5 px-2 text-center text-[#f0f4f8] font-mono">{row.h100}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </GlowCard>
            <p className="text-[10px] text-[#64748b] text-center mt-4">
              * tok/s = tokens per second สำหรับ Qwen 2.5 7B Q4 | Bandwidth หน่วย GB/s | ราคาเครื่องเปล่า ไม่รวมบริการติดตั้ง
            </p>
          </div>
        </div>
      </div>

      {/* Which one for you */}
      <div className="py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-10">
            <span className="text-3xl mb-4 block">🤔</span>
            <h2 className="text-2xl md:text-4xl font-black text-[#f0f4f8] mb-3">เลือกอันไหนดี?</h2>
          </div>

          <div className="space-y-3">
            {[
              { q: "ใช้ 1-3 คน", a: "ประเมิน hardware จาก workload และแอปที่ต้องใช้", color: "#00e5ff" },
              { q: "ใช้หลายคนและมีเอกสารจำนวนมาก", a: "ประเมิน hardware จาก workload และจำนวนผู้ใช้", color: "#00ff88" },
              { q: "ต้องการ AI ที่เร็วขึ้น", a: "ประเมิน memory และ workload ก่อนเลือกสเปก", color: "#8b5cf6" },
              { q: "ต้อง fine-tune model หรือรัน 200B", a: "Spark-class desk box เริ่มต้น ฿179,900", color: "#76B900" },
              { q: "20-50 คนใช้พร้อมกัน", a: "GPU server เริ่มต้น ฿1,190,000", color: "#3b82f6" },
              { q: "50-100+ คนและงานหนัก", a: "GPU server, ประเมินสเปกตาม workload", color: "#f59e0b" },
              { q: "ไม่แน่ใจ", a: "ปรึกษาฟรี, บอกว่าใช้กี่คน ทำอะไร เราแนะนำให้", color: "#ec4899" },
            ].map((item) => (
              <div key={item.q} className="flex items-start gap-3 p-4 rounded-xl bg-[#111827] border border-[#1e293b]">
                <span className="text-sm" style={{ color: item.color }}>→</span>
                <div>
                  <p className="text-sm text-[#f0f4f8] font-medium">{item.q}</p>
                  <p className="text-xs mt-0.5" style={{ color: item.color }}>{item.a}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <a href="/contact" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#00e5ff] to-[#00ff88] text-[#060a14] font-bold hover:opacity-90 transition-opacity">
              ปรึกษาฟรี เลือกเครื่องให้ <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
