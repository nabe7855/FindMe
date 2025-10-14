"use client";

import Layout from "@/components/layout/Layout";
import { AppProvider } from "@/context/AppContext";
import Head from "next/head";
import React from "react";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <Head>
        <title>FindMe - お店との「運命の出会い」を。</title>
        <meta
          name="description"
          content="FindMeはあなたとお店をつなぐマッチングプラットフォームです。"
        />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <body>
        <AppProvider>
          <Layout>{children}</Layout>
        </AppProvider>
      </body>
    </html>
  );
}
