"use client";

import React from "react";

interface OtpFormProps {
	otp: string;
	onOtpChange: (val: string) => void;
	onSubmit: (e: React.FormEvent) => void;
	loading: boolean;
}

export default function OtpForm({ otp, onOtpChange, onSubmit, loading }: OtpFormProps) {
	return (
		<div className='flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8'>
			<div className='w-full max-w-md space-y-8 rounded-2xl bg-white p-8 shadow-xl'>
				<div>
					<h2 className='mt-6 text-center text-3xl font-extrabold tracking-tight text-gray-900'>
						Check your phone
					</h2>
					<p className='mt-2 text-center text-sm text-gray-600'>
						We've sent a code to your phone number
					</p>
				</div>
				<form className='mt-8 space-y-6' onSubmit={onSubmit}>
					<div className='-space-y-px rounded-md shadow-sm'>
						<div>
							<label htmlFor='otp' className='sr-only'>
								One-Time Password
							</label>
							<input
								id='otp'
								name='otp'
								type='text'
								required
								className='relative block w-full appearance-none rounded-lg border border-gray-300 px-3 py-3 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm tracking-widest text-center text-2xl font-bold'
								placeholder='0 0 0 0 0 0'
								value={otp}
								onChange={(e) => onOtpChange(e.target.value)}
								maxLength={6}
							/>
						</div>
					</div>

					<div>
						<button
							type='submit'
							disabled={loading}
							className='group relative flex w-full justify-center rounded-lg border border-transparent bg-indigo-600 px-4 py-3 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 transition-all duration-200'>
							{loading ? (
								<span className='flex items-center'>
									<svg
										className='mr-3 h-5 w-5 animate-spin text-white'
										viewBox='0 0 24 24'>
										<circle
											className='opacity-25'
											cx='12'
											cy='12'
											r='10'
											stroke='currentColor'
											strokeWidth='4'
										/>
										<path
											className='opacity-75'
											fill='currentColor'
											d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
										/>
									</svg>
									Verifying...
								</span>
							) : (
								"Verify OTP"
							)}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
