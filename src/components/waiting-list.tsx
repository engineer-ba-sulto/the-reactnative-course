"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function WaitingList() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // TODO: 実際のAPI呼び出しを実装
    try {
      // シミュレーション用の遅延
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsSubmitted(true);
      setEmail("");
    } catch (error) {
      console.error("登録エラー:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="p-8">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full mx-auto flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">登録完了！</h2>
              <p className="text-gray-600">
                ウェイティングリストに登録されました。コース開始時にご連絡いたします。
              </p>
            </div>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto text-center">
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              ウェイティングリストに登録
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              React Nativeコースの開始をお知らせします。
              早期登録者には特別な特典をご用意しています。
            </p>
          </div>

          <Card className="p-8 max-w-md mx-auto">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="email"
                  placeholder="メールアドレスを入力"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="text-center"
                />
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={isLoading || !email}
              >
                {isLoading ? "登録中..." : "ウェイティングリストに登録"}
              </Button>
            </form>

            <p className="text-sm text-gray-500 mt-4">
              登録は無料です。いつでも解除できます。
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
}
